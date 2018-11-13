# VERSION ?= $(shell git describe --tags --always --dirty --match=v* 2> /dev/null || cat $(CURDIR)/.version 2> /dev/null || echo v0)
VERSION = latest
INTEGRATION_VERSION = integration
PROD_VERSION = prod
PROD_DOCKERFILE = Dockerfile.prod
BLDVER = module:$(MODULE),version:$(VERSION),build:$(shell date +"%Y%m%d.%H%M%S.%N.%z")
BASE_DIR = $(CURDIR)
DOCKER_NAME = scala/ui
NAME = api
GO := GO15VENDOREXPERIMENT=1 go
CGO_ENABLED = 0
OS := $(shell uname)
BUILDFLAGS := ''
DOCKER_PREFIX = 191809208368.dkr.ecr.us-east-1.amazonaws.com
S3URL = s3://andre-workspace

.PHONY: all $(NAME) docker
all: version $(NAME)

$(NAME):| $(BASE_DIR)
	yarn start

$(BASE_DIR):
	mkdir -p $(dir $@)

.PHONY: custom docker deploy

# The rule that is called by our root Makefile during CI builds.-
custom: docker deploy

docker:
	docker build --rm -t $(DOCKER_NAME):$(VERSION) --build-arg version="$(VERSION)" .
ifdef DOCKER_PREFIX
	echo "Docker registry is $(DOCKER_PREFIX)"
	$(aws ecr get-login --no-include-email --region us-east-1)
	docker tag $(DOCKER_NAME):$(VERSION) $(DOCKER_PREFIX)/$(DOCKER_NAME):$(VERSION)
	docker push $(DOCKER_PREFIX)/$(DOCKER_NAME):$(VERSION)
endif


docker-integration:
	docker build --rm -t $(DOCKER_NAME):$(INTEGRATION_VERSION) --build-arg version="$(INTEGRATION_VERSION)" .
ifdef DOCKER_PREFIX
	echo "Docker registry is $(DOCKER_PREFIX)"
	$(aws ecr get-login --no-include-email --region us-east-1)
	docker tag $(DOCKER_NAME):$(INTEGRATION_VERSION) $(DOCKER_PREFIX)/$(DOCKER_NAME):$(INTEGRATION_VERSION)
	docker push $(DOCKER_PREFIX)/$(DOCKER_NAME):$(INTEGRATION_VERSION)
endif

.PHONY: clean version list
clean:
	@docker system prune -af
	@rm -rfv bin
	@rm -rfv build
	@exit 0

version:
	@echo "Version: $(VERSION)"

list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs
