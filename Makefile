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

build-ios:
	$(MAKE) build-prep DEST=IOS
	-eas build -p ios --profile production --auto-submit --non-interactive --no-wait

build-android:
	$(MAKE) build-prep DEST=ANDROID
	-eas build -p android --profile production --auto-submit --non-interactive --no-wait

build-all:
	$(MAKE) build-prep DEST=NATIVE
	-eas build -p all --profile production --auto-submit --non-interactive --no-wait

publish: build-prep
	expo publish --release-channel $(CHANNEL)