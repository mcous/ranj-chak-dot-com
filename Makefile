# ranjchak dot com make file

OUT_DIR := public
SOURCE_DIR := src
SCRIPT_DIR := $(SOURCE_DIR)/script
STYLE_DIR := $(SOURCE_DIR)/style
TEMPLATE_DIR := $(SOURCE_DIR)/template
IMAGE_DIR:= $(SOURCE_DIR)/img
IMAGE_OUT_DIR := $(OUT_DIR)/img

CONTENT := src/content.json

SCRIPT_ENTRY := $(SCRIPT_DIR)/index.js
SCRIPT_SRC := $(SCRIPT_DIR)/*.js
SCRIPT_OUT := $(OUT_DIR)/bundle.js
SCRIPT_MAP := $(OUT_DIR)/bundle.js.map

STYLE_ENTRY := $(STYLE_DIR)/index.css
STYLE_SRC := $(STYLE_DIR)/*.css
STYLE_OUT := $(OUT_DIR)/bundle.css

TEMPLATE_ENTRY := $(TEMPLATE_DIR)/index.jade
TEMPLATE_SRC := $(TEMPLATE_DIR)/*.jade
TEMPLATE_OUT := $(OUT_DIR)/index.html

IMAGE_SRC := $(shell find $(IMAGE_DIR) -name '*.png' -o -name '*.jpg' -o -name '*.gif')
IMAGE_OUT := $(patsubst $(IMAGE_DIR)/%, $(IMAGE_OUT_DIR)/%, $(IMAGE_SRC))

JADE = node_modules/.bin/jade
POSTCSS = node_modules/.bin/postcss
BROWSERIFY = node_modules/.bin/browserify
WATCHIFY = node_modules/.bin/watchify
IMAGEMIN = node_modules/.bin/imagemin
ONCHANGE = node_modules/.bin/onchange
UGLIFY = node_modules/.bin/uglifyjs
CSSNANO = node_modules/.bin/cssnano

JADE_OPTS := -p $(TEMPLATE_ENTRY) -O $(CONTENT) < $(TEMPLATE_ENTRY) > $(TEMPLATE_OUT)
POSTCSS_BASE_OPTS := -c .postcssrc $(STYLE_ENTRY) -o $(STYLE_OUT)
BROWSERIFY_BASE_OPTS := $(SCRIPT_ENTRY) -o $(SCRIPT_OUT)

ifeq ($(NODE_ENV), prod)
	CSSNANO_OPTS := --no-map
	MINIFYIFY_OPTS := -p [minifyify --no-map]
else
	CSSNANO_OPTS := --map --cssnano.sourcemap
	MINIFYIFY_OPTS := -d -p [minifyify --map bundle.js.map --output $(SCRIPT_MAP)]
endif

POSTCSS_OPTS := $(POSTCSS_BASE_OPTS) $(CSSNANO_OPTS)
BROWSERIFY_OPTS := $(BROWSERIFY_BASE_OPTS) $(MINIFYIFY_OPTS)

.PHONY: all clean watch minify minify-js minify-css

all: $(TEMPLATE_OUT) $(STYLE_OUT) $(SCRIPT_OUT) $(IMAGE_OUT)

clean:
	rm -rf $(TEMPLATE_OUT) $(STYLE_OUT) $(SCRIPT_OUT) $(SCRIPT_MAP) $(OUT_DIR)/img/*

watch:
	$(ONCHANGE) $(TEMPLATE_SRC) $(CONTENT) -- make $(TEMPLATE_OUT) &
	$(ONCHANGE) $(STYLE_SRC) $(CONTENT) -- make $(STYLE_OUT) &
	$(WATCHIFY) $(BROWSERIFY_OPTS) -v

$(TEMPLATE_OUT): $(TEMPLATE_SRC) $(CONTENT)
	$(JADE) $(JADE_OPTS)

$(STYLE_OUT): $(STYLE_SRC) $(CONTENT)
	$(POSTCSS) $(POSTCSS_OPTS)

$(SCRIPT_OUT): $(SCRIPT_SRC) $(CONTENT)
	$(BROWSERIFY) $(BROWSERIFY_OPTS)

$(IMAGE_OUT_DIR)/%: $(IMAGE_DIR)/%
	mkdir -p $(@D)
	$(IMAGEMIN) $< > $@
