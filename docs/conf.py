# Configuration file for the Sphinx documentation builder.
# https://www.sphinx-doc.org/en/master/usage/configuration.html

project = "Track Changes in LaTeX — VS Code Extension"
copyright = "2024, MShirazAhmad"
author = "MShirazAhmad"
release = "1.0.2"

extensions = [
    "myst_parser",
]

templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

html_theme = "furo"
html_static_path = ["_static"]

html_theme_options = {
    "light_css_variables": {
        "color-brand-primary": "#0078d4",
        "color-brand-content": "#0078d4",
    },
    "dark_css_variables": {
        "color-brand-primary": "#4fc3f7",
        "color-brand-content": "#4fc3f7",
    },
}

html_title = "Track Changes in LaTeX — VS Code Extension"

myst_enable_extensions = [
    "colon_fence",
]

source_suffix = {
    ".rst": "restructuredtext",
    ".md": "markdown",
}
