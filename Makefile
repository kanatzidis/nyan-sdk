all: clean dev

clean:
	rm -Rf build
	mkdir build

dev: dist deployDev

prod: dist deployProd

dist: index.js node_modules
	cp -R index.js node_modules build
	cd build && zip -r kvsDev.zip index.js node_modules

deployDev:
	aws lambda update-function-code --function-name kvsDev --zip-file fileb://$(PWD)/build/kvsDev.zip
