RELEASE_NUM = 1-0
CHANNEL = prod-$(RELEASE_NUM)
DEST = NONE

build-prep:
	@echo "***************************"
	@echo " App Version Number: $(RELEASE_NUM)"
	@echo " Release Channel: $(CHANNEL)"
	@echo "***************************"
	@echo

	@echo "Updating app.json"
	node scripts/updateConfig.js $(RELEASE_NUM) $(DEST)

build-web: build-prep
	expo build:web
	@osascript -e 'display notification "See terminal" with title "Attention Required"'
	-bash scripts/deploy.sh

build-ios:
	$(MAKE) build-prep DEST=IOS
	-eas build -p ios --profile production --auto-submit --non-interactive --no-wait

build-android:
	$(MAKE) build-prep DEST=ANDROID
	-eas build -p android --profile production --auto-submit --non-interactive --no-wait

build-all:
	$(MAKE) build-prep DEST=ALL
	-eas build -p all --profile production --auto-submit --non-interactive --no-wait

publish: build-prep
	expo publish --release-channel $(CHANNEL)