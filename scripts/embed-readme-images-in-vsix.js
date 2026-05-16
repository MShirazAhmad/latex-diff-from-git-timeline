const fs = require("fs");
const os = require("os");
const path = require("path");
const childProcess = require("child_process");

const vsixPath = process.argv[2] || "track-changes-in-latex-vscode-2.0.0.vsix";
const absoluteVsixPath = path.resolve(vsixPath);

if (!fs.existsSync(absoluteVsixPath)) {
  throw new Error(`VSIX not found: ${absoluteVsixPath}`);
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "latex-diff-vsix-"));

function run(command, args, options = {}) {
  childProcess.execFileSync(command, args, {
    stdio: "inherit",
    ...options,
  });
}

try {
  run("unzip", ["-q", absoluteVsixPath, "-d", tempDir]);

  const readmePath = path.join(tempDir, "extension", "readme.md");
  let readme = fs.readFileSync(readmePath, "utf8");

  readme = readme.replace(
    /!\[([^\]]*)\]\((?:(?:\.\/)?images\/|https:\/\/github\.com\/MShirazAhmad\/Track-Changes-in-LaTeX-VSCode\/raw\/HEAD\/images\/)([^)]+\.png)\)/g,
    (match, alt, imageName) => {
      const imagePath = path.join(tempDir, "extension", "images", imageName);

      if (!fs.existsSync(imagePath)) {
        throw new Error(`README references a missing image: ${imageName}`);
      }

      const data = fs.readFileSync(imagePath).toString("base64");
      return `![${alt}](data:image/png;base64,${data})`;
    }
  );

  fs.writeFileSync(readmePath, readme);
  fs.rmSync(absoluteVsixPath);
  run("zip", ["-q", "-r", absoluteVsixPath, "."], { cwd: tempDir });

  console.log(`Embedded README images in ${vsixPath}`);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
