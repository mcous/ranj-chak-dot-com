# ranjchak dot com make file

OUT_DIR := public
SCRIPT_DIR := src/script
STYLE_DIR := src/style
TEMPLATE_DIR := src/template

SCRIPT_ENTRY := $(SCRIPT_DIR)/index.js
SCRIPT_SRC := $(SCRIPT_DIR)/*.js
SCRIPT_OUT := $(OUT_DIR)/bundle.js

STYLE_ENTRY := $(STYLE_DIR)/index.css
STYLE_SRC := $(STYLE_DIR)/*.css
STYLE_OUT := $(OUT_DIR)/bundle.css

TEMPLATE_ENTRY := $(TEMPLATE_DIR)/index.jade
TEMPLATE_SRC := $(TEMPLATE_DIR)/*.jade $(TEMPLATE_DIR)/template.json
TEMPLATE_OUT := $(OUT_DIR)/index.html

all: $(TEMPLATE_OUT) $(STYLE_OUT) $(SCRIPT_OUT)

clean:
	rm -rf $(OUT_DIR)/*

$(TEMPLATE_OUT): $(TEMPLATE_SRC)
	jade -p $(TEMPLATE_ENTRY) -O $(TEMPLATE_DIR)/template.json < $(TEMPLATE_ENTRY) > $@

$(STYLE_OUT): $(STYLE_SRC)
	echo "not implemented"

$(SCRIPT_OUT): $(SCRIPT_DIR)/*.js
	browserify $(SCRIPT_ENTRY) > $@

# 10.4
