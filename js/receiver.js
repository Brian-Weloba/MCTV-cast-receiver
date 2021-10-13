const context = cast.framework.CastReceiverContext.getInstance();
const playbackConfig = new cast.framework.PlaybackConfig();
const options = new cast.framework.CastReceiverOptions();

let exoPlayerConfig;


context.getPlayerManager().setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {
    // not every load request will have a customData object
    if (loadRequestData.media && loadRequestData.media.customData &&
        loadRequestData.media.customData['exoPlayerConfig']) {
        exoPlayerConfig =
            loadRequestData.media.customData['exoPlayerConfig'];
        // loadRequestData.media.metadata
    }

    context.getPlayerManager().setMediaPlaybackInfoHandler((loadRequest, playbackConfig) => {
        if (!exoPlayerConfig) {
            return;
        }

        playbackConfig.licenseUrl = exoPlayerConfig.licenseUrl ? exoPlayerConfig.licenseUrl : undefined;
        playbackConfig.protectionSystem = exoPlayerConfig.protectionSystem ? exoPlayerConfig.protectionSystem : undefined;

        return playbackConfig;
    });

    return loadRequestData;
});

context.start({ playbackConfig: playbackConfig });