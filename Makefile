RELEASE_NUM = 2-0
CHANNEL = prod-$(RELEASE_NUM)
DEST = NONE

prep:
	@echo "***************************"
	@echo " App Version Number: $(RELEASE_NUM)"
	@echo " Release Channel: $(CHANNEL)"
	@echo "***************************"
	@echo

	@echo "Updating app.json"
	node scripts/updateConfig.js $(RELEASE_NUM) $(DEST)

finish:
	npx prettier --write app.json
	npx prettier --write eas.json

build-web: prep
	cp ./assets/images/icon.png ./web/banner.png
	npx expo export:web
	rm ./web/banner.png
	@osascript -e 'display notification "See terminal" with title "Attention Required"'
	-bash scripts/deploy.sh
	-$(MAKE) finish

build-ios:
	-$(MAKE) prep DEST=IOS
	eas build -p ios --profile production --auto-submit --non-interactive --no-wait
	-$(MAKE) finish

build-android:
	-$(MAKE) prep DEST=ANDROID
	eas build -p android --profile production --auto-submit --non-interactive --no-wait
	-$(MAKE) finish

build-all:
	-$(MAKE) prep DEST=ALL
	eas build -p all --profile production --auto-submit --non-interactive --no-wait
	-$(MAKE) finish

build-ios-dev:
	eas build -p ios --profile development

build-android-dev:
	eas build -p android --profile development

publish: prep
	expo publish --release-channel $(CHANNEL)
	-$(MAKE) finish