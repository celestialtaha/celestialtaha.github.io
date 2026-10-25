import { open } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const cache = new Map();
async function dimensions(url) {
  if (!cache.has(url))
    cache.set(
      url,
      (async () => {
        let file;
        try {
          file = await open(
            fileURLToPath(new URL(`../../public${url}`, import.meta.url)),
            "r",
          );
          const header = Buffer.alloc(24);
          await file.read(header, 0, 24, 0);
          if (header.toString("hex", 0, 8) === "89504e470d0a1a0a")
            return {
              width: header.readUInt32BE(16),
              height: header.readUInt32BE(20),
            };
          if (header.toString("ascii", 0, 3) === "GIF")
            return {
              width: header.readUInt16LE(6),
              height: header.readUInt16LE(8),
            };
        } catch {
          /* Leave unsupported or external image formats unchanged. */
        } finally {
          await file?.close();
        }
        return {};
      })(),
    );
  return cache.get(url);
}
export default function remarkImages() {
  return async function transform(tree) {
    async function visit(node) {
      if (
        node.type === "image" &&
        node.url.startsWith("/") &&
        !node.url.startsWith("//")
      ) {
        node.data ??= {};
        node.data.hProperties = {
          ...node.data.hProperties,
          ...(await dimensions(node.url)),
          loading: "lazy",
          decoding: "async",
        };
      }
      if (node.children) await Promise.all(node.children.map(visit));
    }
    await visit(tree);
  };
}
