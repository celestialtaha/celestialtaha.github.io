"""Audit the generated portfolio without third-party dependencies.

Run after `npm run build`: python3 scripts/audit_portfolio.py
Checks real output: links, fragments, metadata, headings, structured data, and images.
"""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re
import sys
from datetime import datetime

ROOT = Path(__file__).resolve().parent.parent / "dist"
ORIGIN = "https://celestialtaha.github.io"

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.refs, self.images, self.metas = [], [], [], {}
        self.h1s, self.mains, self.title = 0, 0, ""
        self.canonical, self.lang, self.structured = None, None, []
        self.in_title, self.in_json, self.json_text = False, False, ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.append(a["id"])
        for attribute in ("href", "src", "poster"):
            if a.get(attribute):
                self.refs.append(a[attribute])
        if a.get("srcset"):
            self.refs.extend(item.strip().split()[0] for item in a["srcset"].split(","))
        if tag == "html": self.lang = a.get("lang")
        if tag == "h1": self.h1s += 1
        if tag == "main": self.mains += 1
        if tag == "title": self.in_title = True
        if tag == "img": self.images.append(a)
        if tag == "meta": self.metas[a.get("name", a.get("property"))] = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical": self.canonical = a.get("href")
        if tag == "script" and a.get("type") == "application/ld+json":
            self.in_json, self.json_text = True, ""

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_json: self.json_text += data

    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag == "script" and self.in_json:
            self.structured.append(self.json_text)
            self.in_json = False

if not ROOT.exists():
    sys.exit("No dist directory. Run npm run build first.")
pages = {}
for path in sorted(ROOT.rglob("*.html")):
    page = Page()
    page.feed(path.read_text())
    pages[path.resolve()] = page

errors, references = [], 0
for path, page in pages.items():
    label = str(path.relative_to(ROOT.resolve()))
    def fail(message): errors.append(f"{label}: {message}")
    if page.h1s != 1: fail(f"expected one h1, found {page.h1s}")
    if page.mains != 1: fail(f"expected one main landmark, found {page.mains}")
    if not page.lang: fail("missing page language")
    if not page.title.strip(): fail("empty title")
    if not page.metas.get("description", "").strip(): fail("missing description")
    if not page.metas.get("viewport"): fail("missing viewport metadata")
    if not page.canonical or not page.canonical.startswith(ORIGIN + "/"): fail("missing or incorrect canonical origin")
    for key in ("og:title", "og:description", "og:image", "twitter:card"):
        if not page.metas.get(key): fail(f"missing {key}")
    for key, count in Counter(page.ids).items():
        if count > 1: fail(f"duplicate ID: {key}")
    for image in page.images:
        if "alt" not in image: fail(f"image missing alt: {image.get('src')}")
        if not image.get("width") or not image.get("height"): fail(f"image missing dimensions: {image.get('src')}")
    for record in page.structured:
        try:
            parsed = json.loads(record)
            if isinstance(parsed, dict) and parsed.get("@type") == "BlogPosting" and parsed.get("dateModified"):
                published = datetime.fromisoformat(parsed["datePublished"].replace("Z", "+00:00"))
                modified = datetime.fromisoformat(parsed["dateModified"].replace("Z", "+00:00"))
                if modified < published: fail("article revision predates publication")
        except json.JSONDecodeError: fail("invalid JSON-LD")
        except (ValueError, KeyError): fail("invalid article dates")
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc: continue
        references += 1
        if url.path.startswith("/"):
            target = ROOT / unquote(url.path).lstrip("/")
        elif url.path:
            target = path.parent / unquote(url.path)
        else:
            target = path
        if target.is_dir(): target /= "index.html"
        target = target.resolve()
        if not target.exists(): fail(f"missing local target: {ref}")
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            fail(f"missing fragment: {ref}")
research_page = pages.get((ROOT / "research/index.html").resolve())
if research_page:
    lists = []
    for record in research_page.structured:
        try:
            parsed = json.loads(record)
            if isinstance(parsed, dict) and parsed.get("@type") == "ItemList": lists.append(parsed)
        except json.JSONDecodeError: pass
    if lists:
        bibliography = ROOT / "research.bib"
        exported = len(re.findall(r"^@\w+\{", bibliography.read_text(), re.M)) if bibliography.exists() else 0
        if exported != len(lists[0]["itemListElement"]):
            errors.append("research bibliography and publication index contain different work counts")
print(f"Audited {len(pages)} pages and {references} local references.")
if errors:
    print("\n".join(errors))
    sys.exit(1)
print("Passed: links, fragments, headings, metadata, image dimensions, and JSON-LD.")
