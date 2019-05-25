TEST := yarn test
LINT := yarn lint
BUILD := yarn build

lint: 
	$(LINT) 
test: 
	$(TEST)
build:
	$(BUILD)