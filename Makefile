.PHONY: help extension

help:
	@echo "Available targets:"
	@echo "  help        Show this help message"
	@echo "  extension   Bundle the extension into a zip file"

extension:
	zip -r ../my-sciencedirect-redirect.zip . -x .git/\*
