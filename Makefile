LINT := yarn lint
TEST := yarn test
COVERAGE := yarn coverage
BUILD := yarn build
RUN_LOCAL := yarn local

lint: 
	$(LINT) 
test: 
	$(TEST)
coverage:
	${COVERAGE}
build:
	$(BUILD)
local:
	${RUN_LOCAL}