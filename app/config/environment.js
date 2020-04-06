// Set your environment here
IS_PRODUCTION = true

export let MAIN
export let WEB
export let NEW_MAIN

if (IS_PRODUCTION) {

    // Main Config Production

    MAIN                           = 'https://medicloud.sg/v2';
    WEB                            = 'https://medicloud.sg';
    
    NEW_MAIN                       = 'http://13.250.240.152:8080';

} else {

    // Main Config SANDBOX

    MAIN                           = 'http://staging.medicloud.sg/v2';
    WEB                            = 'http://staging.medicloud.sg';

    NEW_MAIN                       = 'http://13.250.240.152:8080';

}
