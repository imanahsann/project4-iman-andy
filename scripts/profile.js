// profile update functions
app.updateProfile = function () {
    app.updateProfileHeading();
    app.updateProfilePicture();
    app.updateProfileIconStats();
    app.updateProfileTextStats();
    app.dates();
    app.updateQuote();
    app.groupCharacters();
    app.updateLocation();
}

// convert name to one with hyphens
app.hyphenated = function(name){
    return name.replace(/ /g, '-');
};

// check if unique image exists
app.unique = function(name, type){
    // loop through image names of type
    for (picture in type) {
        // confirm match
        if (name === type[picture]) {
            return true;
        }
    }
    return false;
};

// update profile heading and page title with character's name
app.updateProfileHeading = function(){
    // empty profile heading
    $('.profile-header h2').empty();
    // add new profile heading
    $('.profile-header h2').append(app.profileCharacter.name);
    // update page title
    document.title = `REVELIO | ${app.profileCharacter.name}`;
};

// update profile picture with unique gif if one exists, otherwise, use default
app.updateProfilePicture = function(){
    // reset photo to default
    $('.profile-header img').attr('src', 'assets/profile-pictures/default.gif');
    // set image alt to character name
    $('.profile-header img').attr('alt', app.profileCharacter.name);
    // if unique image exists, use it, otherwise use default
    if (app.unique(app.hyphenated(app.profileCharacter.name), app.profilePictures)){
        // update image source to unique image
        $('.profile-header img').attr('src', `assets/profile-pictures/${app.hyphenated(app.profileCharacter.name)}.gif`);
    };
};

// update any characteristics that correspond with icon stats (ex, house, school, species)
app.updateProfileIconStats = function(){
    // reset section
    $('.profile-icon-stats').addClass('hidden');
    $('.profile-icon-stats').removeClass('grid');
    $('.icon-container').addClass('hidden');
    // map through array of icon characeristics
    app.profileIconCharacteristics.forEach(function(item){
        // check if icon characteristic exists and is true (otherwise, do nothing)
        if (app.profileCharacter[item] != undefined && app.profileCharacter[item] != false && app.profileCharacter[item] != 'unknown') {
            // for school, dumbledoresArmy, bloodStatus, deathEater, orderOfThePhoenix, ministryOfMagic
            if (item === 'school' || item === 'dumbledoresArmy' || item === 'bloodStatus' || item === 'deathEater' || item === 'orderOfThePhoenix' || item === 'ministryOfMagic' ){
                // add default characteristic image
                $(`.${item}`).attr('src', `assets/icon-stats/${item}.png`);
                // add unique caption and alt
                if (item === 'school' || item === 'bloodStatus') {
                    // reset caption
                    $(`.${item}`).siblings().empty();
                    // append new caption and replace alt
                    $(`.${item}`).siblings().append(`${app.profileCharacter[item]}`);
                    $(`.${item}`).attr('alt', app.profileCharacter[item])
                }
                // show container
                $('.profile-icon-stats').removeClass('hidden');
                $('.profile-icon-stats').addClass('grid');
                $(`.${item}-container`).removeClass('hidden');
            }

            //for house
            else if (item === 'house') {
                    // update image source to unique image
                    $(`.${item}`).attr('src', `assets/icon-stats/${app.hyphenated(app.profileCharacter[item])}.png`);
                    // reset caption
                    $(`.${item}`).siblings().empty();
                    // append new caption and replace alt
                    $(`.${item}`).siblings().append(`${app.profileCharacter[item]}`);
                    $(`.${item}`).attr('alt', app.profileCharacter[item]);
                    // show container
                    $('.profile-icon-stats').removeClass('hidden');
                    $('.profile-icon-stats').addClass('grid');
                    $(`.${item}-container`).removeClass('hidden');
            }

            // for species
            else if (item === 'species') {
                // if unique image exists, use it and show property
                if (app.unique(app.hyphenated(app.profileCharacter[item]), app.speciesList)) {
                    // update image source to unique image
                    $(`.${item}`).attr('src', `assets/icon-stats/${app.hyphenated(app.profileCharacter[item])}.png`);
                    // reset caption
                    $(`.${item}`).siblings().empty();
                    // append new caption and replace alt
                    $(`.${item}`).siblings().append(`${app.profileCharacter[item]}`);
                    $(`.${item}`).attr('alt', app.profileCharacter[item]);
                    // show container
                    $('.profile-icon-stats').removeClass('hidden');
                    $('.profile-icon-stats').addClass('grid');
                    $(`.${item}-container`).removeClass('hidden');
                };
            }
        }
    })
}

// update any characteristics that correspond with text stats (alias, role, wand, bogart, animagus, patronus)
app.updateProfileTextStats = function () {
    // reset section
    $(`.profile-text-stats`).addClass('hidden');
    $(`.profile-text-stats h2`).addClass('hidden');
    $(`.text-container`).addClass('hidden');
    $(`.text-container`).removeClass('grid');
    $('.divider').addClass('hidden');
    // map through array of text characeristics
    app.profileTextCharacteristics.forEach(function (item) {
        // check if text characteristic exists and is not unknown (otherwise, do nothing)
        if (app.profileCharacter[item] != undefined && app.profileCharacter[item] != 'unknown') {
            // if yes, show item text container, header and dividers
            $(`.profile-text-stats`).removeClass('hidden');
            $(`.profile-text-stats h2`).removeClass('hidden');
            $(`.${item}-container`).removeClass('hidden');
            $(`.${item}-container`).addClass('grid');
            $('.divider').removeClass('hidden');
            $('.divider').addClass('grid');
            // empty item
            $(`.${item}`).empty();
            // append value of item to value span
            $(`.${item}`).append(app.profileCharacter[item]);
        }
    })
};

// Get 3 random dates in chronological order for status updates
app.dates = function(){
    // empty array to store dates
    app.datesArray = [];
    // need dates between these points
    start = new Date(1991, 11, 1);
    end = new Date(1998, 04, 20);
    // loop 3 times
    for (i = 0; i < 3; i++) {
        // random date, define month
        date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        // format month, day, year, time stamp
        months = [`Jan.`, `Feb.`, `Mar.`, `Apr.`, `May`, `Jun.`, `Jul.`, `Aug.`, `Sep.`, `Oct.`, `Nov.`, `Dec.`];
        month = months['' + date.getMonth()];
        day = '' + date.getDate() + ',';
        year = date.getFullYear() + ' @';
        time = date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        // store number of milliseconds since midnight Jan 1 1970 - will use to sort dates
        dateMs = date.getTime();
        finalDate = [month, day, year, time].join(' ');
        app.datesArray.push({dateMs, finalDate});
    };
    // sort date into new array in chronological order
    // empty array to store dateMs
    datesMsArray = [];
    // store dateMs in new array
    app.datesArray.forEach(function(item) {
        datesMsArray.push(item.dateMs);
    });
    // sort datesMs
    datesMsArray.sort();
    // empty array for final dates in chronological order
    app.finalDatesArray = [];
    // for each dateMs, find matching finalDate and push to finalDatesArray
    datesMsArray.forEach(function (item) {
        app.datesArray.forEach(function (dateObj) {
            if ( item === dateObj.dateMs ) {
                app.finalDatesArray.push(dateObj.finalDate);
            }
        });
    });
};

// Update quote text with character quote, if one exists
app.updateQuote = function () {
    // reset section
    $(`.profile-quote-status`).addClass('hidden');
    $(`.profile-quote-status`).removeClass('grid');
    $(`.quote .status`).empty();
    $(`.profile-quote-status .date`).empty();
    //store character name without spaces
    const char = app.profileCharacter.name.replace(/ /g, '');
    // loop through object of quotes
    for (character in app.quotes) {
        // check if key is the same as character name
        if ( char === character ) {
            // store character's quotes
            let quotes = app.quotes[char];
            // pick a random quote
            let quote = quotes[Math.floor(Math.random() * quotes.length)];
            // append quote to quote span
            $(`.quote .status`).append(quote);
            // append most recent date to date span
            $(`.profile-quote-status .date`).append(app.finalDatesArray[2]);
            // display quote
            $(`.profile-quote-status`).removeClass('hidden');
            $(`.profile-quote-status`).addClass('grid');
        }
    }
};

// Create arrays with similar characters grouped together for friend status updates and for friends list
app.groupCharacters = function () {
    // Groupings for friends
    app.groupArray = [`house`, `deathEater`, `school`, `species`];
    // get all character array
    app.getAPIData("characters");
    $.when(app.getData).then(function (res) {
        //  map through group array
        app.groupArray.map(function (group) {
            // create empty group array
            app[group] = []
            // map through all characters and add all in same group to respective array
            res.map(function (item) {
                if (item.name != app.profileCharacter.name && app.profileCharacter[group] === item[group] && app.profileCharacter[group] != false && app.profileCharacter[group] != '' && app.profileCharacter[group] != 'unknown' && app.profileCharacter[group] != undefined) {
                    app[group].push(item);
                }
            });
        });
        // when complete, update friend related sections
        app.updateFriendStatus();
        app.updateFriendsList();
        app.updateFriendsListDiv();
        app.friendsListObject(app.friendsList);
    }).then(() => {
        app.refreshProfile('.friend > img', app.friendsNameObjectPair);
    });
};

// update friend status (character became friends with...)
app.updateFriendStatus = function(){
    // reset section
    $(`.profile-friend-status`).addClass('hidden');
    $(`.profile-friend-status`).removeClass('grid');
    $(`.profile-friend-status .status`).empty();
    $(`.profile-friend-status .date`).empty();
    // run through group array until name available to append to friend status
    for ( i = 0; i < app.groupArray.length; i++) {
        // if group array has items, store random character
        if ( app[app.groupArray[i]].length > 0 ) {
            randChar = app[app.groupArray[i]][Math.floor(Math.random() * app[app.groupArray[i]].length)];
            // append random character to friend status
            $(`.profile-friend-status .status`).append(`${app.profileCharacter.name} became friends with ${randChar.name}.`);
            // update friend status date
            $(`.profile-friend-status .date`).append(app.finalDatesArray[1]);
            // show friend status
            $(`.profile-friend-status`).removeClass('hidden');
            $(`.profile-friend-status`).addClass('grid');
            // exit loop
            return
        }
    }
};

// update friends list with at most 6 characters from a similar group
app.updateFriendsList = function(){
    // empty array to add friends to
    app.friendsList = [];
    // run through group array until name available to append to friend status
    for (i = 0; i < app.groupArray.length; i++) {
        // create duplicate group array to splice from
        let dupArray = app[app.groupArray[i]];
        // if group array has items, store random character
        if (dupArray.length > 0 ) {
            // run through group at least 6 times before moving on to next group
            for (j = 0; j < 6; j++) {
                // store random character spliced from duplicate array
                randCharr = dupArray.splice([Math.floor(Math.random() * dupArray.length)], 1);
                // add random character to friends list
                app.friendsList.push(randCharr);

                if (app.friendsList.length === 6) {
                    // stop when 6 friends added
                    // app.updateFriendsListDiv();
                    return
                }
            }
        }
    }
};

// convert app.friendsList to a key-value pair of name:corresponding object
app.friendsListObject = function(friendsList) {
    // update
    friendsList.forEach(function (friends) {
        app.friendsNameObjectPair[friends[0].name] = friends[0];
    })
}

app.updateFriendsListDiv = function () {
    // reset section
    $('caption').remove();
    $('.friends').addClass('hidden');
    $('.profile-friends-list').addClass('hidden');
    $('.profile-friends-list').removeClass('grid');
    $('.friend').addClass('hidden');
    $('.friend').removeClass('grid');
    $('.friend img').attr('src', 'assets/profile-pictures/default.gif');
    // loop through friendsList array
    for (i = 0; i < app.friendsList.length; i++) {
        // store friend's name
        const friendName = app.friendsList[i][0].name;
        // append character name from friendsList array to friends list div
        $(`.friend-${i}`).append(`<caption>${friendName}</caption>`);
        // show friend
        $('.friends').removeClass('hidden');
        $('.profile-friends-list').removeClass('hidden');
        $('.profile-friends-list').addClass('grid');
        $(`.friend-${i}`).removeClass('hidden');
        $(`.friend-${i}`).addClass('grid');
        // update image alt
        $(`.friend-${i}-img`).attr('alt', friendName);
        // if unique image exists, use it, otherwise use default
        if (app.unique(app.hyphenated(friendName), app.profilePictures)) {
            // update image source to unique image
            $(`.friend-${i}-img`).attr('src', `assets/profile-pictures/${app.hyphenated(friendName)}.gif`);
        };
    }
};

// Update character's location
app.updateLocation = function () {
    // reset section
    $(`.profile-location-status .status`).empty();
    $(`.profile-location-status .date`).empty();
    // pick a random location
    let location = app.locations[Math.floor(Math.random() * app.locations.length)];
    // append location to location span
    $(`.profile-location-status .status`).append(`${app.profileCharacter.name} checked in at ${location}.`);
    // append earliest date to date span
    $(`.profile-location-status .date`).append(app.finalDatesArray[0]);
};
