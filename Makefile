# ranjchak dot com make file

OUT_DIR := public
SCRIPT_DIR := src/script
STYLE_DIR := src/style
TEMPLATE_DIR := src/template

CONTENT := src/content.json

SCRIPT_ENTRY := $(SCRIPT_DIR)/index.js
SCRIPT_SRC := $(SCRIPT_DIR)/*.js
SCRIPT_OUT := $(OUT_DIR)/bundle.js

STYLE_ENTRY := $(STYLE_DIR)/index.css
STYLE_SRC := $(STYLE_DIR)/*.css
STYLE_OUT := $(OUT_DIR)/bundle.css

TEMPLATE_ENTRY := $(TEMPLATE_DIR)/index.jade
TEMPLATE_SRC := $(TEMPLATE_DIR)/*.jade
TEMPLATE_OUT := $(OUT_DIR)/index.html

JADE = node_modules/.bin/jade
POSTCSS = node_modules/.bin/postcss
BROWSERIFY = node_modules/.bin/browserify
WATCHIFY = node_modules/.bin/watchify
ONCHANGE = node_modules/.bin/onchange

JADE_OPTS := -p $(TEMPLATE_ENTRY) -O $(CONTENT) < $(TEMPLATE_ENTRY) > $(TEMPLATE_OUT)
POSTCSS_OPTS := -u lost $(STYLE_ENTRY) > $(STYLE_OUT)
BROWSERIFY_OPTS := $(SCRIPT_ENTRY) -o $(SCRIPT_OUT)

.PHONY: all clean watch

all: $(TEMPLATE_OUT) $(STYLE_OUT) $(SCRIPT_OUT)

clean:
	rm -rf $(TEMPLATE_OUT) $(STYLE_OUT) $(SCRIPT_OUT)

watch:
	$(ONCHANGE) $(TEMPLATE_SRC) $(CONTENT) -- make $(TEMPLATE_OUT) &
	$(POSTCSS) -w $(POSTCSS_OPTS) &
	$(WATCHIFY) $(BROWSERIFY_OPTS) -v

$(TEMPLATE_OUT): $(TEMPLATE_SRC) $(CONTENT)
	$(JADE) $(JADE_OPTS)

$(STYLE_OUT): $(STYLE_SRC)
	$(POSTCSS) $(POSTCSS_OPTS)

$(SCRIPT_OUT): $(SCRIPT_DIR)/*.js
	$(BROWSERIFY) $(BROWSERIFY_OPTS)
