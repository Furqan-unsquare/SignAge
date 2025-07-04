const fs = require("fs");
const path = require("path");
const { Font } = require("../model/ConfigItem");

const fontsDir = path.join(__dirname, "..", "fonts");

exports.getAllFontsWithFileInfo = async (req, res) => {
  try {
    const files = fs
      .readdirSync(fontsDir)
      .filter(file => /\.(ttf|otf|woff2?|eot)$/i.test(file));

    const fontsFromDb = await Font.find();

    const combinedFonts = files.map(filename => {
      const matched = fontsFromDb.find(f => f.filename === filename);
      return {
        filename,
        name: matched?.name || path.parse(filename).name,
        rate: matched?.rate || 0,
        _id: matched?._id || null,
        source: 'custom',
      };
    });

    res.json(combinedFonts);
  } catch (err) {
    console.error("Font loading error:", err);
    res.status(500).json({ error: "Failed to load fonts", details: err.message });
  }
};

exports.createFont = async (req, res) => {
  try {
    const { name, rate, filename } = req.body;
    if (!filename || !fs.existsSync(path.join(fontsDir, filename))) {
      return res.status(400).json({ error: "Font file not found" });
    }
    const font = new Font({ name, rate, filename });
    const savedFont = await font.save();
    res.status(201).json(savedFont);
  } catch (err) {
    console.error("Font creation error:", err);
    res.status(500).json({ error: "Failed to create font", details: err.message });
  }
};

exports.updateFont = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rate } = req.body;
    const font = await Font.findByIdAndUpdate(id, { name, rate }, { new: true });
    if (!font) return res.status(404).json({ error: "Font not found" });
    res.json(font);
  } catch (err) {
    console.error("Font update error:", err);
    res.status(500).json({ error: "Failed to update font", details: err.message });
  }
};

exports.deleteFont = async (req, res) => {
  try {
    const { id } = req.params;
    const font = await Font.findByIdAndDelete(id);
    if (!font) return res.status(404).json({ error: "Font not found" });
    res.json({ message: "Font deleted successfully" });
  } catch (err) {
    console.error("Font deletion error:", err);
    res.status(500).json({ error: "Failed to delete font", details: err.message });
  }
};