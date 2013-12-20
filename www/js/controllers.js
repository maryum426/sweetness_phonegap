'use strict';

function SweetCtrl($window, UpdateService, $log, $scope, sweetService, interactionService, authService,
                   userService, $location, utilService, $rootScope, CONSTANTS, socialNetworksService, facebookService) {
    if (!userService.currentUser()) {
        $location.path(CONSTANTS.ROUTES.AUTH);
    } else {

        $scope.comeOn = 'be consistent';

        $scope.currentPage = 0;
        $scope.currentPagePlace = 0;
        $scope.currentPageInteraction = 0;
        $scope.pageSize = CONSTANTS.DEFAULT_AVATAR_PAGINATION_SIZE;
        $scope.pageSizePlace = CONSTANTS.DEFAULT_AVATAR_PAGINATION_SIZE_PLACE;
        $scope.toggleAvatarIcon = CONSTANTS.GLYPH_ICONS.PLUS;

        $scope.interactionData = {};
        $scope.feeds = [];
        $scope.timelines = [];

        $scope.hello = "Hello Sweet Controller!";
        $scope.sweet = {};
        $scope.userSweets = [];
        $scope.sweets = [];

        $scope.newSweet = {};
        $scope.newPlace = {};
        $scope.addsweetplace = {};
        $scope.userPlaces = [];
        $scope.userPlacesJoinReq = [];

        // These 2 properties will be set when clicking on the map
        $scope.clickedLatitudeProperty = null;
        $scope.clickedLongitudeProperty = null;

        //$rootScope.userAvatar = null ;
        $rootScope.placeAvatar = null ;
        

        $scope.editorEnabled = false;

        /** the initial center of the map */
        /*$scope.centerProperty = {
            latitude:45,
            longitude:-73
        };*/

        /** the initial zoom level of the map */
        /*$scope.zoomProperty = 8;*/

        /** list of markers to put in the map */
        /*$scope.markersProperty = [
            {
                latitude:45,
                longitude:-74
            }
        ];*/

        $scope.placeAlert = {};

        //blue
        $scope.kiosk = {
            fullname:null,
            vocation:null
        };
        
        $scope.$watch($rootScope.infoUserChannal, function () {
            $scope.kiosk = {
                fullname:$rootScope.infoUserChannal.fullNmae,
                vocation:$rootScope.infoUserChannal.vocation,
                email:$rootScope.infoUserChannal.email
            };
        })
        
        /*$scope.resetNewSweetValues = function () {

            $scope.newSweet.gestureType = CONSTANTS.DEFAULT_GESTURE_TYPE;
            $scope.newSweet.text = CONSTANTS.DEFAULT_GESTURE_TEXT;
            $scope.newSweet.picture = false;
            $scope.showFileSelect = false;

            $scope.selectedGestureTextIndex = 0;
            $scope.newSweet.starImage = CONSTANTS.EXPRESSIONS.STAR_DEFAULT_IMAGE;
            $scope.newSweet.heartImage = CONSTANTS.EXPRESSIONS.HEART_DEFAULT_IMAGE;

            $scope.selectedGreetingBackgroundIndex = 0;
            $scope.newSweet.greetingBackground = CONSTANTS.GREETING_BACKGROUNDS[0];

            $scope.selectedFontColorIndex = 0;
            $scope.newSweet.fontColor = CONSTANTS.FONT_COLORS[0];
        }*/

        /*$scope.interactionEvents = CONSTANTS.INTERACTION.EVENTS;
        $scope.interactionFrequencies = CONSTANTS.INTERACTION.FREQUENCIES;*/

        $scope.getAvatar = function (receiverPhone) {

            for (var j = 0; j < $scope.userSweets.length; j++) {
                if (angular.equals($scope.userSweets[j].get("receiverPhone"), receiverPhone)) {
                    
                    return $scope.userSweets[j].get("receiverAvatar");
                }
            }
            return "img/avatar.png";
        };

        /*$scope.resetNewSweetValues();*/

        $scope.numberOfPages = function () {
            return Math.ceil($scope.friends.length / $scope.pageSize);
        };

        $scope.toggleAvatar = function () {
            if ($scope.pageSize == $scope.friends.length) {
                $scope.pageSize = CONSTANTS.DEFAULT_AVATAR_PAGINATION_SIZE;
                ;
                $scope.toggleAvatarIcon = CONSTANTS.GLYPH_ICONS.PLUS;
            } else {
                $scope.currentPage = 0;
                $scope.pageSize = $scope.friends.length;
                $scope.toggleAvatarIcon = CONSTANTS.GLYPH_ICONS.MINUS;
            }
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.nextPage = function () {
           
            if ((( ($scope.currentPage + 1) * $scope.pageSize) < $scope.friends.length - 1) && $scope.pageSize != $scope.friends.length) {
                $scope.currentPage++;
            }
        };

        $scope.prevPage_place = function () {
            if ($scope.currentPagePlace > 0) {
                $scope.currentPagePlace--;
            }
        };

        $scope.nextPage_place = function () {
           
            if ((( ($scope.currentPagePlace + 1) * $scope.pageSize) < $rootScope.listPlaces.length - 1) && $scope.pageSize != $rootScope.listPlaces.length) {
                $scope.currentPagePlace++;
            }
        };

        $scope.prevPage_interaction = function () {
            if ($scope.currentPageInteraction > 0) {
                $scope.currentPageInteraction--;
            }
        };

        $scope.nextPage_interaction = function () {
           
            if ((( ($scope.currentPageInteraction + 1) * $scope.pageSize) < $scope.timelines.length - 1) && $scope.pageSize != $scope.timelines.length) {
                
                $scope.currentPageInteraction++;
            }
        };

        $scope.prevPage_placesweet = function () {
            if ($scope.currentPageInteraction > 0) {
                $scope.currentPageInteraction--;
            }
        };

        $scope.nextPage_placesweet = function () {
           
            if ((( ($scope.currentPageInteraction + 1) * $scope.pageSizePlace) < $rootScope.placeSweets.length - 1) && $scope.pageSizePlace != $rootScope.placeSweets.length) {
                
                $scope.currentPageInteraction++;
            }
        };

        /*$scope.hideAutoReply = function (item) {
            return item.get("auto") != 'true';
        };*/

        /*$scope.setting = function () {
           
            $scope.setLastVisitedPage();
            $location.path('/user/setting');
        }*/
        /*$scope.loadInteractionData = function () {
            interactionService.getInteractionById($scope.currentInteraction, function (rInteractionData) {
                $scope.safeApply(function () {
                    var play = rInteractionData.get("play");
                    var visibility = rInteractionData.get("visibility");
                    var eject = rInteractionData.get("eject");
                    $scope.interactionData.notes = rInteractionData.get("notes");
                    $scope.interactionData.frequency = rInteractionData.get("frequency");
                    $scope.interactionData.event = rInteractionData.get("event");

                    $scope.interactionData.lockIcon = visibility ? "icon-unlock" : "icon-lock";
                    $scope.interactionData.playIcon = play ? "icon-play" : "icon-pause";
//                    $scope.interactionData.playIcon = play ? "icon-play" : "icon-pause" ;
                });
            });
        };*/

        /*$scope.loadSweets = function (interaction) {
            $scope.interactingPersonName = interaction.get("receiverName");
            $scope.interactingPersonPhone = interaction.get("receiverPhone");
            $scope.currentInteraction = interaction;
            $scope.loadInteractionData();
//            $scope.interactionData.notes = interaction.get("notes");
//            $scope.interactionData.event = interaction.get("event");
//            $scope.interactionData.frequency = interaction.get("frequency");
//            $scope.interactingPersonAvatar = "img/avatar.png";
            if (!interaction.get("receiverAvatar"))
                $scope.interactingPersonAvatar = $scope.getAvatar(interaction.get("receiverPhone"));
            else
                $scope.interactingPersonAvatar = interaction.get("receiverAvatar");
            sweetService.loadSweets(interaction, function (rSweets) {
                $scope.safeApply(function () {
                    $scope.sweets = rSweets;
                });
            });
        };*/

        /*$scope.userInteractions = function () {
            return $scope.userSweets;
        };

        $scope.interactionSweets = function () {
            return $scope.sweets;
        };

        $scope.saveInteractionNotes = function (notes) {
            interactionService.saveNotes($scope.currentInteraction, notes);
        };

        $scope.saveInteractionVisibility = function (visibility) {
            visibility = !visibility;
            $scope.interactionData.visibility = visibility;
            visibility ? $scope.interactionData.lockIcon = "icon-unlock" : $scope.interactionData.lockIcon = "icon-lock";
            interactionService.saveVisibility($scope.currentInteraction, visibility);
        };


        $scope.saveInteractionPlay = function (play) {
            play = !play;
            $scope.interactionData.play = play;
            play ? $scope.interactionData.playIcon = "icon-play" : $scope.interactionData.playIcon = "icon-pause";
            interactionService.savePlay($scope.currentInteraction, play);
        };

        $scope.saveInteractionEject = function (eject) {
            eject = !eject;
            interactionService.saveEject($scope.currentInteraction, eject);
        };

        $scope.saveInteractionEvent = function (event) {
            $scope.interactionData.event = event.event;
           
            interactionService.saveEvent($scope.currentInteraction, event.event, function (rUserInteraction) {
                $scope.safeApply(function () {
                    $scope.interactionData.event = rUserInteraction.get("event");
                    $scope.getUserSweets();
//                    $scope.currentInteraction.set("event",rUserInteraction.get("event"));
//                 $scope.currentInteraction = rUserInteraction;
                });
            });
        };

        $scope.saveInteractionFrequency = function (frequency) {
            $scope.interactionData.frequency = frequency.frequency;
            interactionService.saveFrequency($scope.currentInteraction, frequency.frequency);
        };*/

        $scope.changeFontColor = function () {
            if ($scope.selectedFontColorIndex == CONSTANTS.FONT_COLORS.length - 1) {
                $scope.selectedFontColorIndex = -1;
            }
            $scope.newSweet.fontColor = CONSTANTS.FONT_COLORS[++$scope.selectedFontColorIndex];

        };

        $scope.setGreetingBackground = function () {
//            var index = $scope.selectedGreetingBackgroundIndex++;
           
            if ($scope.selectedGreetingBackgroundIndex == CONSTANTS.GREETING_BACKGROUNDS.length - 1) {
                $scope.selectedGreetingBackgroundIndex = -1;
            }
            $scope.newSweet.greetingBackground = CONSTANTS.GREETING_BACKGROUNDS[++$scope.selectedGreetingBackgroundIndex];
            

        };

//      TODO: verify and remove
        $scope.randomColor = function () {
            return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        };

        /*$scope.respondToSweet = function (sweet) {
            $scope.newSweet.receiverName = sweet.get("senderName");
            $scope.newSweet.receiverPhone = sweet.get("senderPhone");
            $scope.newSweet.receiverAvatar = $scope.getAvatar(sweet.get("senderPhone"));
            $scope.newSweet.replyToSweet = sweet.id;
            $scope.newSweet.text = "";
            $log.info("--- respondToSweet --- sweet.get('gestureType')" + sweet.get("gestureType"));
            $scope.newSweet.gestureType = sweet.get("gestureType");
            $log.info("--- respondToSweet --- sweet" + sweet);
            $log.info("--- respondToSweet --- newSweet" + $scope.newSweet);
            $log.info("--- respondToSweet --- newSweet.gestureType" + $scope.newSweet.gestureType);
            $location.path('/sweet/new');
        };*/

        /*$scope.interactWithPerson = function () {
            $scope.newSweet.receiverName = $scope.currentInteraction.get("receiverName");
            $scope.newSweet.receiverPhone = $scope.currentInteraction.get("receiverPhone");
            $scope.newSweet.receiverAvatar = $scope.currentInteraction.get("receiverAvatar");
            $location.path('/sweet/new');
        };

        $scope.setReceiver = function (interaction) {
//            $scope.toggleAvatar();
            $scope.pageSize = CONSTANTS.DEFAULT_AVATAR_PAGINATION_SIZE;
            $scope.toggleAvatarIcon = CONSTANTS.GLYPH_ICONS.PLUS;

            $scope.newSweet.receiverName = interaction.get("receiverName");
            $scope.newSweet.receiverPhone = interaction.get("receiverPhone");
            $scope.newSweet.receiverAvatar = interaction.get("receiverAvatar");
        };*/

        $rootScope.$on('user_interaction', function () {
            
//           $scope.getUserSweets();
            $scope.showInteraction(interactionService.getInteraction());


        });

        /*$rootScope.$on('user_registration', function () {
            $scope.kiosk.fullname = $rootScope.information['fullName'];
            $scope.kiosk.vocation = $rootScope.information['avatarUrl'];
        });*/
        /*$scope.showSweet = function (sweet) {
            $scope.sweet = sweet;
            $location.path('/sweet/show');
        };

        $scope.addExpressions = function () {
            $location.path('/sweet/expressions');
        };*/

        /*$scope.setSweetExpression = function (expression) {
            

            switch (expression) {
                case 'picture':
                    $scope.newSweet.picture = !$scope.newSweet.picture;
                    $scope.showFileSelect = true;
                    break;
                case 'star':
                    $scope.newSweet.star = !$scope.newSweet.star;
                    $scope.newSweet.starImage = ($scope.newSweet.starImage == "img/Star-Fuller-Brighter.png") ? "img/Star-Default-Fuller.png" : "img/Star-Fuller-Brighter.png";
                    
                    break;
                case 'heart':
                    $scope.newSweet.heart = !$scope.newSweet.heart;
                    $scope.newSweet.heartImage = ($scope.newSweet.heartImage == "img/Heart-Fuller.png") ? "img/Heart-Default-Fuller.png" : "img/Heart-Fuller.png";
                    break;
                default:
                    $scope.newSweet.star = !$scope.newSweet.star;
                    break;
            }
        };*/

//  Purple deprecated
        /*$scope.setGesture = function (type) {
            var index = $scope.selectedGestureTextIndex++;
            
            $scope.newSweet.gestureType = type;
            switch (type) {
                case "sayThankYou":
                    if (index >= CONSTANTS.GESTURE.THANK_YOU.TEXT.length - 1) $scope.selectedGestureTextIndex = 0;
                    $scope.newSweet.text = CONSTANTS.GESTURE.THANK_YOU.TEXT[index];
                    break;
                case "sendAHello":
                    if (index >= CONSTANTS.GESTURE.HELLO.TEXT.length - 1) $scope.selectedGestureTextIndex = 0;
                    $scope.newSweet.text = CONSTANTS.GESTURE.HELLO.TEXT[index];
                    break;
                case "sendGreetings":
                    if (index >= CONSTANTS.GESTURE.GREETING.TEXT.length - 1) $scope.selectedGestureTextIndex = 0;
                    $scope.newSweet.text = CONSTANTS.GESTURE.GREETING.TEXT[index];
                    break;
            }
        };*/

        /*$scope.getUserSweets = function () {
            sweetService.userSweets(function (rUserSweets) {
                $scope.safeApply(function () {
                    $scope.userSweets = rUserSweets;
                });
            });
        };*/

        $scope.$watch('userSweets', function () {
            //$log.info("$watch -> userSweets changed.");
            var userChannels = [];
            for (var i = 0; i < $scope.userSweets.length; i++) {
//           //$log.info($scope.userSweets[i].get("receiverPhone"));
                userChannels.push($scope.userSweets[i].get("receiverPhone"));
            }
            // //$log.info(userChannels);
            userService.getUserChannelsByIds(userChannels, function (rUserChannels) {
                $scope.safeApply(function () {
                    for (var i = 0; i < rUserChannels.length; i++) {
                        rUserChannels[i].get("channels").forEach(function (channel) {

                            for (var j = 0; j < $scope.userSweets.length; j++) {
//                          //$log.info($scope.userSweets[j].get("receiverPhone"));
//                          //$log.info(channel);
                                if (angular.equals($scope.userSweets[j].get("receiverPhone"), channel)) {
                                    if (rUserChannels[i].get("avatarURL")) {
                                        $scope.userSweets[j].set("receiverAvatar", rUserChannels[i].get("avatarURL"));
//                                //$log.info($scope.userSweets[j].get("receiverAvatar"));
                                    } else {
                                        $scope.userSweets[j].set("receiverAvatar", CONSTANTS.DEFAULT_AVATAR);
                                    }
                                }
                            }

                        });
                    }
                });
            });
        });

//    TODO:limit text size due to SMS limitation
//    TODO: check for empty fields

        /*$scope.sendSweet = function () {

            var updateAvailable = false;
            

            UpdateService.checkForUpdates(function (rUpdateAvailable) {
                if (rUpdateAvailable) {
                    $log.info("---Software update is available. Page will reload---");
                    // window.location.reload();
                    updateAvailable = true;
                }
                else {
                    $location.path(CONSTANTS.ROUTES.USER_INTERACTION);
                }
            });


            sweetService.saveSweet($scope.newSweet, function (rSweet, rUserSweet) {
                
                sweetService.sendSweet(rSweet, $rootScope.fromEmailAddress, function (success) {
                    $scope.safeApply(function () {
                        if (!success) $rootScope.info.title = CONSTANTS.ERROR.DEFAULT;
                        if (updateAvailable) $window.location.reload();
                        $scope.newSweet = {};
                        $scope.resetNewSweetValues();
//                        TODO: do we need getUserSweets here?
                        $scope.getUserSweets();
                        $scope.loadSweets(rUserSweet);
                        $scope.loadInteractionData();
                        $rootScope.showInfobarMessage(CONSTANTS.SWEETNESS.MESSAGE.SENT, CONSTANTS.SHOW_MESSAGE_TIME);
                    });
                });
            });

        };*/

//  Bubble
        $scope.setGestureType = function (type) {
            $scope.newSweet.gestureType = type;
            sweetService.setGestureText(type, 0, function (text) {
                $scope.newSweet.text = text;
            });
        };
        //-------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------
        /*$scope.sendSweetPlace = function (friend) {

            $scope.allfriend = friend;
            $scope.magicButtonImage = $scope.allfriend['picture'];
            

            $scope.section.sending = true;

            $location.path("/location/sweetsent");

            $scope.showGestureSendActions = true;
            $scope.section.sendingPlace = true;

        }*/

        /*$scope.cancelSweetPlace = function () {
            $scope.squeezed = false;
            $scope.hideFriendsList = false;
            $scope.showGestureSendActions = false;
            $scope.magicButtonImage = $scope.newSweet.senderPicture;
            $scope.gestures = CONSTANTS.GESTURES;
            $scope.setMe();
            $scope.$parent.setSubActionsState(false);
            $location.path('/location/sweetplace');
        };*/

       /*$scope.sendPlaceSweetness = function (friend) {

            $scope.friend = friend;
            $scope.magicButtonImage = $scope.friend['picture']['data']['url'];
            

            $scope.section.sending = true;
            $location.path("/location/sent");

            $scope.showGestureSendActions = true;
            $scope.section.sendingPlace = true;
        }*/

        /*$scope.sendSweetnessGesture = function (gestureType, sweetId) {

            $scope.section.sending = true;
            //$location.path("/sweet/sent");

            if (sweetId) $scope.newSweet.replyToSweet = sweetId;
            $scope.newSweet.receiverPhone = $scope.friend["id"];
            $scope.newSweet.receiverName = $scope.friend["name"];
            $scope.newSweet.receiverChannel = $scope.friend["network"];
            $scope.newSweet.receiverPicture = $scope.friend["picture"]["data"]["url"];
            $scope.newSweet.gesture = CONSTANTS.GESTURES[0].sub_actions[2];

           

            $scope.newSweet.text = "Thank You";
//            $scope.newSweet.template = $scope.newSweet.gesture.template;

            sweetService.saveSweet($scope.newSweet, function (rSweet, rUserSweet) {
                $scope.safeApply(function () {
                    $scope.sweets.push(rSweet);
                    $scope.sweets.sortByProp("updatedAt");
                });
//                var message = $rootScope.sweetPerson(rSweet.get("senderName")) + " "+ rSweet.get('text') + " " +$rootScope.sweetPersonMe(rSweet.get("receiverName"),rSweet.get("senderName"));
//                sweetService.setGestureText($scope.newSweet.gestureType,1,function(text) {
                $scope.safeApply(function () {
                    facebookService.postToWall(rSweet, $scope.newSweet.gesture.facebook_template, function (success) {
                        $scope.$parent.updateLoginInfo();
                        $scope.squeezed = false;

                        setTimeout(function () {
                            $scope.section.sending = false;
                            $scope.safeApply();
                        }, 4000);

                    });
                });
                $location.path("/location/place");
            });
            $scope.showGestureSendActions = false;
            $scope.section.sendingPlace = false;
        };*/

        /*$scope.sendSweetnessPlaceGesture = function (gestureType, sweetId) {

            $scope.section.sending = true;
            //$location.path("/sweet/sent");

            if (sweetId) $scope.newSweet.replyToSweet = sweetId;
            $scope.newSweet.receiverPhone = $scope.allfriend["id"];
            $scope.newSweet.receiverName = $scope.allfriend["name"];
            $scope.newSweet.receiverChannel = $scope.allfriend["network"];
            $scope.newSweet.receiverPicture = $scope.allfriend["picture"];
            $scope.newSweet.gesture = CONSTANTS.GESTURES[0].sub_actions[2];

            
            $scope.newSweet.text = "Thank You, all of you";
//            $scope.newSweet.template = $scope.newSweet.gesture.template;

            sweetService.saveSweet($scope.newSweet, function (rSweet, rUserSweet) {
                $scope.safeApply(function () {
                    $scope.sweets.push(rSweet);
                    $scope.sweets.sortByProp("updatedAt");
                });
//                var message = $rootScope.sweetPerson(rSweet.get("senderName")) + " "+ rSweet.get('text') + " " +$rootScope.sweetPersonMe(rSweet.get("receiverName"),rSweet.get("senderName"));
//                sweetService.setGestureText($scope.newSweet.gestureType,1,function(text) {
                $scope.safeApply(function () {
                    facebookService.postToWall(rSweet, $scope.newSweet.gesture.facebook_template, function (success) {
                        $scope.$parent.updateLoginInfo();
                        $scope.squeezed = false;

                        setTimeout(function () {
                            $scope.section.sending = false;
                            $scope.safeApply();
                        }, 4000);

                    });
                });
                $location.path("/location/sweetplace");
            });

            $scope.showGestureSendActions = false;
            $scope.section.sendingPlace = false;
        };*/
        
        /*$scope.phoneSweets = function() {
         var query = new Parse.Query("placeusers");

         query.get("kWQUnPONOk", {
         success:function(placeusers) {
         
         var friends = placeusers.data;
         },
         error:function() {
         
         }
         });
         }*/
        //--------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------
        /*$scope.sendSweetness = function (gestureType, sweetId) {

            $scope.section.sending = true;
            $location.path("/sweet/sent");

            if (sweetId) $scope.newSweet.replyToSweet = sweetId;
            $scope.newSweet.receiverPhone = $scope.friend["id"];
            $scope.newSweet.receiverName = $scope.friend["name"];
            $scope.newSweet.receiverChannel = $scope.friend["network"];
            $scope.newSweet.receiverPicture = $scope.friend["picture"]["data"]["url"];

//            $scope.setGestureType(gestureType);

           

            $scope.newSweet.text = "";
//            $scope.newSweet.template = $scope.newSweet.gesture.template;
            sweetService.saveSweet($scope.newSweet, function (rSweet, rUserSweet) {
                $scope.safeApply(function () {
                    $scope.sweets.push(rSweet);
                    $scope.sweets.sortByProp("updatedAt");
                });
//                var message = $rootScope.sweetPerson(rSweet.get("senderName")) + " "+ rSweet.get('text') + " " +$rootScope.sweetPersonMe(rSweet.get("receiverName"),rSweet.get("senderName"));
//                sweetService.setGestureText($scope.newSweet.gestureType,1,function(text) {
                $scope.safeApply(function () {
                    facebookService.postToWall(rSweet, $scope.newSweet.gesture.facebook_template, function (success) {
                        $scope.$parent.updateLoginInfo();
                        $scope.squeezed = false;

                        setTimeout(function () {
                            $scope.section.sending = false;
                            $scope.safeApply();
                        }, 4000);

                    });
                });

            });
            $scope.showGestureSendActions = false;
        };*/

        $scope.loadSocialNetworks = function (cb) {
            socialNetworksService.load(function (rSocialNetworks) {
                $scope.safeApply(function () {
                    var friendsArray = [];
                    $scope.socialNetworks = rSocialNetworks;
                    for (var i = 0; i < rSocialNetworks.length; i++) {
                        var friends = rSocialNetworks[i].get("friends");
                        for (var j = 0; j < friends.length; j++) {
                            friends[j]["network"] = rSocialNetworks[i].get("name");
                            friendsArray.push(friends[j]);
                        }

                    }
                    $scope.friends = friendsArray;

                    $scope.newSweet.senderName = $scope.socialNetworks[0].get('me')['first_name'] + " " + $scope.socialNetworks[0].get('me')['last_name'];
                    $scope.newSweet.senderPicture = $scope.socialNetworks[0].get('me')['picture'];
                    if ($scope.newSweet.senderPicture)
                        
//                    $rootScope.sweeter.name = $scope.newSweet.senderName;
                    $rootScope.sweeter.picture = $scope.newSweet.senderPicture;

                    $scope.newSweet.senderChannel = $scope.socialNetworks[0].get('name');
                    $scope.newSweet.senderPhone = $scope.loggedInUser.get("authData")["facebook"]["id"];
                    

//                    $scope.setMe();
                    cb("done");

                });
            });
        };

        /*$scope.searchFriend = function (friend) {
            $scope.section.showPeopleSearchBox = false;
            $scope.setFriend(friend);
            $location.path("/sweet/people");

        };*/

        $scope.setFriend = function (friend) {
            $scope.squeezed = false;
            $scope.gesture = CONSTANTS.GESTURES;
            $scope.hideFriendsList = true;

//            $scope.friend = JSON.parse(friend);

            $scope.friend = friend;
            $scope.magicButtonImage = $scope.friend['picture']['data']['url'];
            $scope.magicButtonImage = "http://graph.facebook.com/" + $scope.friend['id'] + "/picture?width=200&height=200";
            
//            if(!$scope.squeezed)
//                $scope.enableGestureSendActions();
//            if($scope.squeezed)
//                $scope.sendSweetness();
//            if($scope.friend)
//                $location.path('/sweet/friend');
        };

        /*$scope.sendSqueeze = function (friend) {

            $scope.safeApply(function () {
                $scope.squeezed = true;
                $scope.newSweet.gesture = CONSTANTS.SQUEEZE;
                $scope.hideFriendsList = true;

                $scope.friend = friend;
                $scope.magicButtonImage = $scope.friend['picture']['data']['url'];
                
                //            if(!$scope.squeezed)
                $scope.enableGestureSendActions();
                //            if($scope.squeezed)
                //                $scope.sendSweetness();
                //            if($scope.friend)
                //                $location.path('/sweet/friend');
            });
        };*/


        /*$scope.$watch("friend", function (oldValue, newValue) {
            

            //$scope.magicButtonImage = userService.currentUser().get("authData")['picture']['data']['url'];

            $scope.sweets = [];
            if ($scope.friend) {
                $rootScope.sweeter.name = $scope.friend["name"]; //comment by kashif undo this change
                
//                $scope.twoWayInteraction();
            }

            sweetService.getUserPlaces($scope.friend.id, function (placeUserSweets) {
               
                $scope.safeApply(function () {
                    $rootScope.listPlaces = placeUserSweets;
                   
                });
            });

            sweetService.getPlaces(function (placeSweets) {
               
                $scope.safeApply(function () {
                    $rootScope.places = placeSweets;
                });
            });

        }, true);*/

        /*$scope.twoWayInteraction = function () {

            var friendId = $scope.friend["id"];
           

            $scope.interaction = {};
            $scope.interaction[friendId] = {};
            $scope.interaction[friendId].sweets = [];
            $scope.interaction[friendId].mySweets = [];
            $scope.interaction[friendId].totalSweets = [];

            loadInteraction(userService.currentUser().id, friendId, function (rSweets) {
                $scope.interaction[friendId].sweets = rSweets;

                userService.getUserByChannel(friendId, function (rUser) {
                    if (rUser) {
                  
                        loadInteraction(rUser.id, userService.currentUser().get("username"),
                            function (rSweets) {
                                $scope.interaction[friendId].sweets = $scope.interaction[friendId].sweets.concat(rSweets);
                            }
                        );
                    }
                });
            });
        };*/

        /*var loadInteraction = function (id, phone, cb) {
           
            interactionService.getInteractionWith(id, phone, function (rUserSweet) {
                if (rUserSweet) {
                    sweetService.getSweetsBySweetIds(rUserSweet.get("sweets"), function (rSweets) {
                        if (rSweets) {
//                           
                            $scope.safeApply(function () {
                                cb(rSweets);
                            });
                        }
                    });
                }
                cb([]);
            });
        };*/

        /*$scope.sweetForInteraction = function (sweet) {

            $scope.safeApply(function () {
               
                $scope.hideFriendsList = true;

                $scope.friend = {};
                $scope.friend.id = sweet.get("senderPhone");
                $scope.friend.name = sweet.get("senderName");
                $scope.friend.network = sweet.get("senderChannel");

                $scope.friend.picture = {};
                $scope.friend.picture['data'] = {};
                $scope.friend.picture['data']['url'] = sweet.get("senderPicture");

                $scope.magicButtonImage = sweet.get("senderPicture");

                $rootScope.latestSweet = sweet;
            });

        };*/

        /*$scope.navToFeed = function () {
            $location.path("/sweet/feed");
        };

        $scope.navToFriend = function () {
            //$location.path("/sweet/friend");
            $location.path("/place/friend");
        };*/

        /*$scope.loadFeeds = function () {
            $scope.feeds = [];
  
            sweetService.getSweetsByReceiverPhone(userService.currentUser().get("username"), function (rSweets) {
                if (rSweets) {
                    $scope.safeApply(function () {
                        $scope.feeds = rSweets;
                    });
                }
            });
        };*/

        /*$scope.loadTimeline = function () {
            $scope.timelines = [];
            $scope.timelinesfollow = [];
            interactionService.getMyInteractions(function (rUserSweets) {
                if (rUserSweets) {
                    var sweetIds = [];
                    for (var i = 0; i < rUserSweets.length; i++) {
                        var sweets = rUserSweets[i].get("sweets");
                        sweets.forEach(function (e, i, a) {
                            sweetIds.push(e);
                        });
                    }
                    sweetService.getSweetsBySweetIds(sweetIds, function (rSweets) {
                        $scope.safeApply(function () {
                            $scope.timelines = rSweets;
                           
                        });
                    });

                    sweetService.getUserFollowingSweet(function (fSweets) {
                      
                        $scope.timelinesfollow = fSweets;
                        $scope.timelinesfollow = $scope.timelinesfollow.concat($scope.timelines);
                       
                    });
                }

            });

        };*/

        //---------------------------------------------------------------------------------------
        //---------------------------------------------------------------------------------------
        /*$scope.cancelGestureActionPlace = function () {
            $scope.squeezed = false;
            $scope.showPlace();
        };*/

        /*$scope.showPlace = function () {

            $scope.hideFriendsList = false;
            $scope.showGestureSendActions = false;
            $scope.magicButtonImage = $scope.newSweet.senderPicture;
            $scope.gestures = CONSTANTS.GESTURES;
            $scope.setMe();
            $scope.$parent.setSubActionsState(false);
            $location.path('/location/place');
        };*/
        //----------------------------------------------------------------------------------------
        //----------------------------------------------------------------------------------------
        /*$scope.cancelGestureAction = function () {
            $scope.squeezed = false;
            $scope.showPeople();
        };*/

        /*$scope.showPeople = function () {

            $scope.hideFriendsList = false;
            $scope.showGestureSendActions = false;
            $scope.magicButtonImage = $scope.newSweet.senderPicture;
            $scope.gestures = CONSTANTS.GESTURES;
            $scope.setMe();
            $scope.$parent.setSubActionsState(false);
            $location.path('/sweet/people');
        };
        $scope.showFriendInteraction = function () {
            $location.path('/sweet/friend');
            $scope.setMe();
        };*/

        $scope.setMe = function () {
            var timeout = 2000;
            if (userService.currentUser() && userService.currentUser().get("authData")["facebook"]["id"])
                timeout = 0;

            setTimeout(function () {
                $scope.safeApply(function () {
                    $scope.friend = {};
                    $scope.friend.id = userService.currentUser().get("authData")["facebook"]["id"];

                    $scope.friend.name = $rootScope.userChannel.get("fullName");
                    $scope.friend.network = "facebook";

                    $scope.friend.picture = {};
                    $scope.friend.picture['data'] = {};
                    $scope.friend.picture['data']['url'] = $scope.newSweet.senderPicture;

                    $scope.magicButtonImage = $scope.newSweet.senderPicture;
                });
            }, timeout);

        };

        /*$scope.showFeed = function () {
            $scope.$parent.setLastVisitedPage();
            $location.path('/sweet/feed');
            $scope.loadFeeds();
        };*/

        /*$scope.showTimeline = function () {
            $scope.$parent.setLastVisitedPage();
            $location.path('/sweet/timeline');
            $scope.loadTimeline();
        };*/

        //Replication of above function for use in alpha
        /*$scope.showFeedPlace = function () {
            $scope.$parent.setLastVisitedPage();
            $location.path('/place/feed');
            $scope.loadFeeds();
        };

        $scope.showTimelinePlace = function () {
            $scope.$parent.setLastVisitedPage();
            $location.path('/place/timeline');
            $scope.loadTimeline();
        };

        /*$scope.gestures = CONSTANTS.GESTURES;
      

        $scope.updateGestures = function (gesture) {
            $scope.newSweet.gesture = _.omit(gesture, '$$hashKey');
           
            if (gesture.sub_actions) {
                $scope.$parent.setSubActionsState(true);
                $scope.gestures = gesture.sub_actions;
            }
            if (!$scope.squeezed)
                $scope.enableGestureSendActions();
        };

        $scope.enableGestureSendActions = function () {
            if ($scope.friend && $scope.newSweet.gesture && !$scope.newSweet.gesture.sub_actions) {
                $scope.showGestureSendActions = true;
            }
        };*/

        /*$scope.$on('resetGestures', function () {
            $rootScope.latestSweet = {};
            $scope.gestures = CONSTANTS.GESTURES;
            $scope.showGestureSendActions = false;
//            $scope.showInteraction();
            $scope.showPeople();
        });

        $scope.friendSearch = function (mFriendSearchText) {
            if (mFriendSearchText.length > 2) {
                for (var i = 0; i < $scope.friends.length; i++) {
                    if ($scope.friends[i]['name'].toLowerCase().indexOf(mFriendSearchText.toLowerCase()) == 0) {
                       
                        $scope.setFriend($scope.friends[i]);
                        $scope.section.friendSearchText = "";
                        $scope.section.showPeopleSearchBox = false;
                        break;
                    }
                }
            }
        };*/

        //       Squeeze

        /*$scope.squeezeCounter = 0;
        $scope.squeezeTimer;
        $scope.squeezeUp = function (e) {
            clearInterval($scope.squeezeTimer);
            $scope.squeezeTimer = 0;
            if ($scope.squeezeCounter >= 3) {
                $scope.squeezed = true;
                $scope.newSweet.gesture = CONSTANTS.SQUEEZE;
              

//                setTimeout(function() {
//                    $scope.safeApply(function() {
//                    });
//                },3000);

            }
            $scope.squeezeCounter = 0;

        };*/

        $scope.countDown = function () {
            $scope.safeApply(function () {
                $scope.squeezeCounter += 1;
            });
        };

        $scope.squeezeDown = function (e) {
            $scope.squeezedText = "Squeezed";
            $scope.squeezeCounter += 1;
            $scope.squeezeTimer = setInterval(function () {
                $scope.countDown()
            }, 1000);
        };

        $scope.$on('navigate_to_interaction', function () {
           
            $scope.safeApply(function () {
                $scope.sweets = [];
                $scope.twoWayInteraction();
                $scope.navToFriend();

            });
        });

        // Sweet place

        /*$scope.navigateToSweetPlace = function () {

            $scope.setMe();
            $scope.$parent.setLastVisitedPage();
            $scope.loadPlace();
            //$scope.myPlace();
            $rootScope.sweeter.name = $scope.newSweet.senderName;
            $scope.magicButtonImage = $scope.newSweet.senderPicture;
            $scope.section.friendSearchText = "";

            $rootScope.listPlaces = [];

            sweetService.getUserPlaces($scope.friend.id, function (placeUserSweets) {
                
                $scope.safeApply(function () {
                    $rootScope.listPlaces = placeUserSweets;
                   
                });
            });

            $location.path('/place/sweetPlace');
            //$scope.loadTimeline();
        };*/

        /*$scope.showFeedPlace = function () {
            $scope.$parent.setLastVisitedPage();
            $scope.setMe();
            $location.path('/place/feed');
            $scope.loadFeeds();
        };

        $scope.showTimelinePlace = function () {
            $scope.$parent.setLastVisitedPage();
            $location.path('/place/timeline');
            $scope.loadTimeline();
        };

        $scope.showTimelinePlaceTest = function () {
            $scope.$parent.setLastVisitedPage();
            $scope.loadTimeline();
            $location.path('/place/interAction');
        };

        $scope.showTimelinePlaceTestP = function () {
            $scope.$parent.setLastVisitedPage();
            $scope.loadTimeline();
            $location.path('/place/interActionP');
        };*/

        /*$scope.createSweetPlace = function () {

            $location.path('/place/createSweetPlace');
            $scope.setLastVisitedPage();
            //$scope.hideFriendsList = false;
            $scope.placeMsg = false;
            //$scope.magicButtonImage = $scope.newSweet.senderPicture;
            //$scope.gestures  = CONSTANTS.GESTURES;
            $scope.setMe();

            //$scope.$parent.setSubActionsState(false);


            $scope.initializeGMap($scope);
        };*/

        //       Squeeze End

        /*$scope.creatPlaceParse = function (place) {

            $scope.newPlace = [];
            $rootScope.currentPlace = [];

          
            $scope.newPlace.placeName = ((place.name).replace(/[\s\$\&\!\. ,:-]+/g, "")).toLowerCase();
            $scope.newPlace.placeTitle = place.title;
            $scope.newPlace.placeSweetName = '';
            //$scope.newPlace.placeAddress2 = document.getElementById("target").value;
            $scope.newPlace.placeAddress2 = place.address2;

            if ($rootScope.userAvatar == false){
                $scope.newPlace.placePhoto = 'http://files.parse.com/7ddeea41-9b34-46f5-b20f-1e58e72ef6ee/d0296c4c-a48e-4742-a8b9-664c7ad5ee96-DSC_0144.JPG';
            } else {
                $scope.newPlace.placePhoto = $rootScope.userAvatar ;
            }

            $scope.newPlace.placeDesc = '';
            $scope.newPlace.placeURL = '';
            $scope.newPlace.placeLatitude = '';
            $scope.newPlace.placeLongitude = '';

            $scope.newPlace.LatLong = $rootScope.placeSearchResults.LatLong;
            //$scope.newPlace.photo = $rootScope.placeSearchResults.photo ;
            $scope.newPlace.gname = $rootScope.placeSearchResults.gname;
            $scope.newPlace.icon = $rootScope.placeSearchResults.icon;
            $scope.newPlace.formatted_address = $rootScope.placeSearchResults.formatted_address;

            sweetService.saveSweetPlaceParse($scope.newPlace, function (results) {
                //$location.path('/place/sweetPlace');
                //$scope.searchSweetPlace();
                if (results.length == 0) {

                    $scope.newPlace.placeCreatorId = userService.currentUser().id
                    $scope.newPlace.userID = $scope.friend.id;
                    $scope.newPlace.userName = $scope.friend.name;
                    $scope.newPlace.userNetwork = $scope.friend.network;
                    $scope.newPlace.userPic = $scope.friend.picture['data']['url'];
                    $scope.newPlace.joinReq = "1";

                    //add the place in current user profile
                    //addSweetPlaceParse - add user to place
                    sweetService.addSweetPlaceParse($scope.newPlace, function () {

                        $scope.showPlaceAfterCreate($scope.newPlace);

                    });

                    //after creating place go backto myplaces location
                    //$scope.showPlaceNew();
                    //$scope.showPlaceAfterCreate($scope.newPlace);

                    //$location.path('/place/showPlace');
                }
                if (results.length > 0) {
                  

                    $location.path('/place/createSweetPlace');
                    $scope.setLastVisitedPage();
                    $scope.placeMsg = true;
                    $scope.setMe();

                    $scope.initializeGMap($scope);
                }
            });
        }*/

        /*$scope.createSweetPlace1 = function() {

         $location.path('/place/createSweetPlace');
         $scope.setLastVisitedPage();
         //$scope.hideFriendsList = false;
         $scope.placeMsg = true;
         //$scope.magicButtonImage = $scope.newSweet.senderPicture;
         //$scope.gestures  = CONSTANTS.GESTURES;
         $scope.setMe();

         //$scope.$parent.setSubActionsState(false);


         $scope.initializeGMap($scope);
         };*/

        /*$scope.showPlaceAfterCreate = function (place) {

            $rootScope.usersInPlaces = [];
            $rootScope.currentPlace = [];
            $rootScope.placeSweets = [];

           
            $rootScope.currentPlace = place;


            sweetService.getPlacesSweets(place.placeName, function (placeSweets) {
               
                $scope.safeApply(function () {
                    $rootScope.placeSweets = placeSweets;
                });
            });

            sweetService.getPlacestoJoin(place.placeName, $scope.friend.id, function (placeDetailSweets) {
              
                if (placeDetailSweets.length == 0) {
                    $rootScope.placeJoin = true;
                } else {
                    $rootScope.placeJoin = false;
                }
            });
            
            sweetService.getPlacesDetail(place.placeName, function (placeDetailSweets) {
              
                $scope.safeApply(function () {
                    $rootScope.usersInPlaces = placeDetailSweets;
                });
            });
            $location.path('/place/showPlace');
        }*/

        /*$scope.placeReload = function () {
            *//*$scope.placeMsg = false;
             $location.path('/place/createSweetPlace');
             window.location.reload();*//*
            $scope.createSweetPlace();
        }*/

        /*$scope.showPlaceNew = function () {
            $scope.setMe();
            $scope.$parent.setLastVisitedPage();

            // $scope.myPlace();
            //load place is user for search places
            //$scope.loadPlace();
            //$location.path('/place/searchPlace');

            sweetService.getUserPlaces($scope.friend.id, function (placeUserSweets) {
               
                    $scope.userAddedPlaces = placeUserSweets;
                });
            });

            sweetService.getUserCreatedPlaces($scope.friend.id, function (placeUserSweets) {
                
                $scope.safeApply(function () {
                    $scope.userPlaces = placeUserSweets;
                });
            });

            //TODO : uncomment this when need join request on myplaces
            *//*sweetService.getUserPlacesJoinReq($scope.friend.id , function(placeUserJoinReqSweets) {
            
             $scope.safeApply(function() {
             $scope.userPlacesJoinReq = placeUserJoinReqSweets;
             });
             });*//*
            $location.path('/place/myplaces');
        };*/

        /*$scope.loadPlace = function (cb) {
            $rootScope.places = [];
            sweetService.getPlaces(function (placeSweets) {
               
                $scope.safeApply(function () {
                    $rootScope.places = placeSweets;
                });
            });

        };*/

        /*$scope.joinPlace = function (place) {
            $scope.currentPlace = [];
            $scope.currentPlace = place;
        }*/

        /*$scope.addPlace = function (place) {

            $scope.setLastVisitedPage();

           
            //$scope.addsweetplace.placecid = place.get("objectId") ;
            $scope.addsweetplace.placeCreatorId = place.get("placeCreatorId");
            $scope.addsweetplace.placeName = place.get("placeName");
            $scope.addsweetplace.placeDesc = place.get("placeDesc");
            $scope.addsweetplace.placeSweetName = place.get("placeSweetName");
            $scope.addsweetplace.placeURL = place.get("placeURL");
            $scope.addsweetplace.placeLatitude = place.get("placeLatitude");
            $scope.addsweetplace.placeLongitude = place.get("placeLongitude");
            //$scope.addsweetplace.placeaddress = place.get("placeaddress") ;

            $scope.addsweetplace.LatLong = place.get("LatLong");
            //$scope.addsweetplace.photo = place.get("photo") ;
            $scope.addsweetplace.gname = place.get("gname");
            $scope.addsweetplace.icon = place.get("icon");

            $scope.addsweetplace.userID = $scope.friend.id;
            $scope.addsweetplace.userName = $scope.friend.name;
            $scope.addsweetplace.userNetwork = $scope.friend.network;
            $scope.addsweetplace.userPic = $scope.friend.picture['data']['url'];

            sweetService.addSweetPlaceParse($scope.addsweetplace, function () {

            });
            $scope.navigateToSweetPlace();
        }*/

        /*$scope.addPlaceDirect = function (place) {

          

            //$scope.addsweetplace.placecid = place.get("objectId") ;
            $scope.addsweetplace.placecreatorid = place.placeCreatorId;
            $scope.addsweetplace.placename = place.name;
            $scope.addsweetplace.placedesc = place.description;
            $scope.addsweetplace.placesweetname = place.sweetname;
            $scope.addsweetplace.placeurl = place.url;
            $scope.addsweetplace.placelatitude = document.getElementById("Latitude").value;
            $scope.addsweetplace.placelongitude = document.getElementById("Longitude").value;

            $scope.addsweetplace.userID = $scope.friend.id;
            $scope.addsweetplace.userName = $scope.friend.name;
            $scope.addsweetplace.userNetwork = $scope.friend.network;
            $scope.addsweetplace.userPic = $scope.friend.picture['data']['url'];

            sweetService.addSweetPlaceParse($scope.addsweetplace, function () {

            });
            $scope.navigateToSweetPlace();
        }*/

        /*$scope.myPlace = function () {

           

            sweetService.getUserPlaces($scope.friend.id, function (placeUserSweets) {
                $scope.safeApply(function () {
                    $scope.userPlaces = placeUserSweets;
                });
            });

            sweetService.getUserPlacesJoinReq($scope.friend.id, function (placeUserJoinReqSweets) {
             
                $scope.safeApply(function () {
                    $scope.userPlacesJoinReq = placeUserJoinReqSweets;
                });
            });

            $location.path('/place/sweetPlace');
        };*/

        /*$scope.myPlaceDetail = function (place) {

            $scope.setLastVisitedPage();
            $scope.showPlaceGestureSendActions = true;
            $scope.magicButtonImage = $scope.newSweet.senderPicture;
            $rootScope.sweeter.name = $scope.newSweet.senderName;

            $rootScope.usersInPlaces = [];
            $rootScope.currentPlace = [];
            $rootScope.placeSweets = [];
            $rootScope.placeFollower = [];

            $scope.placeFollow = true;
            $scope.placeUnFollow = false;

            //this newPlace use in create place
            //TODO : need to delete it. this is over head
            $scope.newPlace.placeName = '';

         

            $rootScope.currentPlace = place;

            *//** the initial center of the map *//*
            *//*$scope.centerProperty = {
                latitude:place.get("placeLatitude"),
                longitude:place.get("placeLongitude")
            };*//*

            *//** the initial zoom level of the map *//*
            //$scope.zoomProperty = 8;

            *//** list of markers to put in the map *//*
            *//*$scope.markersProperty = [
                {
                    latitude:place.get("placeLatitude"),
                    longitude:place.get("placeLongitude")
                }
            ];*//*

            //$scope.zoomProperty = 4;

         

            sweetService.getPlacesSweets(place.get("placeName"), function (placeSweets) {
               
                $scope.safeApply(function () {
                    $rootScope.placeSweets = placeSweets;
                });
            });

            sweetService.getPlacestoJoin(place.get("placeName"), userService.currentUser().get("authData")["facebook"]["id"], function (placeDetailSweets) {
               
                if (placeDetailSweets.length == 0) {
                    $rootScope.placeJoin = true;
                } else {
                    $rootScope.placeJoin = false;
                }
            });

            sweetService.getPlacesDetail(place.get("placeName"), function (placeDetailSweets) {
               
                $scope.safeApply(function () {
                    $rootScope.usersInPlaces = placeDetailSweets;
                    //$location.path('/place/showPlace');
                });
            });

            sweetService.getPlacesFollower(place.get("placeName"), function (placeFollower) {
               
                $scope.safeApply(function () {
                    $rootScope.placeFollower = placeFollower;
                 });
                for (var i = 0; i < placeFollower.length; i++) {
                   
                    if (placeFollower[i].get("phone") == userService.currentUser().get("authData")["facebook"]["id"]){
                       
                        $scope.placeFollow = false;
                        $scope.placeUnFollow = true;
                    }
                }
            });

            $location.path('/place/showPlace');
        }*/

        /*$scope.myPlaceDetailTemp = function (place) {
            $scope.$parent.setLastVisitedPage();

            $scope.usersInPlaces = [];
            $scope.currentPlace = [];

            $scope.currentPlace = place;

            *//** the initial center of the map *//*
            $scope.centerProperty = {
                latitude:place.get("placeLatitude"),
                longitude:place.get("placeLongitude")
            };

            *//** the initial zoom level of the map *//*
            $scope.zoomProperty = 8;

            *//** list of markers to put in the map *//*
            $scope.markersProperty = [
                {
                    latitude:place.get("placeLatitude"),
                    longitude:place.get("placeLongitude")
                }
            ];

            $scope.zoomProperty = 14;

            sweetService.getPlacesDetail(place.get("placeName"), function (placeDetailSweets) {
             
                $scope.safeApply(function () {
                    $scope.usersInPlaces = placeDetailSweets;
                    $location.path('/place/joinPlace');
                });
            });
        }*/

        /*$scope.searchSweetPlace = function () {
            //load place is user for search places
            $scope.loadPlace();
            $location.path('/place/searchPlace');
        }*/

        /*$scope.myPlaceProfile = function (place) {

            $scope.setLastVisitedPage();

            $rootScope.usersInPlaces = [];
            $rootScope.currentPlace = [];
            $rootScope.placeJoinReq = [];
            $rootScope.comments = [];

            $rootScope.currentPlace = place;

            *//*$scope.centerProperty = {
             latitude: place.get("placeLatitude"),
             longitude:place.get("placeLongitude")
             };


             $scope.zoomProperty = 8 ;


             $scope.markersProperty = [ {
             latitude: place.get("placeLatitude"),
             longitude:place.get("placeLongitude")
             }];

             $scope.zoomProperty = 4 ;*//*

       

            *//*sweetService.getPlacesSweets(place.get("placeName") , function(placeSweets) {
           
             $scope.safeApply(function() {
             $rootScope.placeSweets = placeSweets;
             });
             });*//*

            //Get Place whom current user req to join
            *//*sweetService.getPlacestoJoin(place.get("placeName") ,$scope.friend.id, function(placeDetailSweets) {
             
             if (placeDetailSweets.length == 0){
             $rootScope.placeJoin = true;
             } else {
             $rootScope.placeJoin = false;
             }
             });*//*

            sweetService.getComments(place.get("placeName"), function (placeComments) {
                $scope.safeApply(function () {
                    $rootScope.comment = placeComments;
                });
               
            });

            // Get user who request to join Place
            sweetService.placeJoinReq(place.get("placeName"), $scope.friend.id, function (placeReq) {
               
                $rootScope.placeJoinReq = placeReq;
            });

            sweetService.getPlacesDetail(place.get("placeName"), function (placeDetailSweets) {
                $scope.safeApply(function () {
                   
                    $rootScope.usersInPlaces = placeDetailSweets;
                    $location.path('/place/placeProfile');
                });
            });


        }*/

        /*$scope.acceptReq = function (user) {

            $scope.updatePlace = [];
            $scope.updatePlace.userID = user.get("userID");
            $scope.updatePlace.placeName = user.get("placeName");

            sweetService.updatePlaceUser($scope.updatePlace, function () {
               
                $scope.myPlaceProfile($rootScope.currentPlace);
            });
        }*/

        /*$scope.rejectReq = function (user) {
          
            $scope.updatePlace = [];
            $scope.updatePlace.userID = user.get("userID");
            $scope.updatePlace.placeName = user.get("placeName");

            sweetService.deletePlaceUser($scope.updatePlace, function () {
               
                $scope.myPlaceProfile($rootScope.currentPlace);
            });
        }*/

        /*$scope.rejectReqPlace = function (user) {
            $scope.reqReject = [];
            $scope.reqReject = user;
          
            $scope.showReqJoin = true;
            $scope.placeComments = true;
        }*/

        /*$scope.rejectPlaceProfileUser = function () {
          
            $scope.updatePlace = [];
            $scope.updatePlace.userID = $scope.reqReject.get("userID");
            $scope.updatePlace.placeName = $scope.reqReject.get("placeName");

            sweetService.deletePlaceUser($scope.updatePlace, function () {
              
                $scope.myPlaceProfile($rootScope.currentPlace);
            });
            $scope.showReqJoin = false;
            $scope.placeComments = false;
            $scope.myPlaceProfile($rootScope.currentPlace);
        }*/

        /*$scope.cancelReq = function () {
            $scope.showReqJoin = false;
            $scope.myPlaceProfile($rootScope.currentPlace);
            $scope.placeComments = false;
        }*/

        /*$scope.sendPlaceGesture = function (uplace) {
     
            $scope.setLastVisitedPage();
            $rootScope.sweeter.name = uplace.get('userName');


            $scope.placeInfo = [];
            $scope.placeInfo = uplace;
            $scope.magicButtonImage = uplace.get('userPic');
         

            $scope.section.sending = true;
            $scope.showPlaceGestureSendActions = true;
            $location.path("/place/sent");

            $scope.section.sendingPlace = true;
			
			loadingViews();
        }*/

        /*$scope.cancelPlaceGesture = function() {
         $scope.$parent.setLastVisitedPage();
         $location.path("/place/sent");
         }*/

        /*.sendPlaceGestureParse = function (place, sweetId) {
            $scope.newPlaceSweet = {};

            $scope.section.sending = true;

            if (sweetId) $scope.newSweet.replyToSweet = sweetId;
            $scope.newSweet.receiverPhone = $scope.placeInfo.get('userID');
            $scope.newSweet.receiverName = $scope.placeInfo.get('userName');
            $scope.newSweet.receiverChannel = $scope.placeInfo.get('userNetwork');
            $scope.newSweet.receiverPicture = $scope.placeInfo.get('userPic');
            $scope.newSweet.gesture = CONSTANTS.GESTURES[0].sub_actions[2];

            $scope.newSweet.text = "Thank You";
            //Sweet related to place
            if (sweetId) $scope.newPlaceSweet.replyToSweet = sweetId;
            $scope.newPlaceSweet.receiverPhone = $scope.placeInfo.get('userID');
            $scope.newPlaceSweet.receiverName = $scope.placeInfo.get('userName');
            $scope.newPlaceSweet.receiverChannel = $scope.placeInfo.get('userNetwork');
            $scope.newPlaceSweet.receiverPicture = $scope.placeInfo.get('userPic');
            $scope.newPlaceSweet.senderName = $scope.newSweet.senderName;
            $scope.newPlaceSweet.gesture = CONSTANTS.GESTURES[0].sub_actions[2];

            *//*{"placeSweetName":"asas","placeDesc":"asas","placeURL":"asasas"}*//*
            $scope.newPlaceSweet.placecreatorid = $scope.placeInfo.get('placeCreatorId');
            $scope.newPlaceSweet.placename = $scope.placeInfo.get('placeName');
            $scope.newPlaceSweet.placesweetname = $scope.placeInfo.get('placeSweetName');

            $scope.newPlaceSweet.text = "Thank You";

            sweetService.saveSweet($scope.newSweet, function (rSweet, rUserSweet) {
                $scope.safeApply(function () {
                    $scope.sweets.push(rSweet);
                    $scope.sweets.sortByProp("updatedAt");
                });

                $scope.safeApply(function () {
                    facebookService.postToWall(rSweet, $scope.newSweet.gesture.facebook_template, function (success) {
                        $scope.$parent.updateLoginInfo();
                        $scope.squeezed = false;

                        setTimeout(function () {
                            $scope.section.sending = false;
                            $scope.safeApply();
                        }, 4000);

                    });
                });

                sweetService.saveSweetofPlace($scope.newPlaceSweet, function (rSweet, rUserSweet) {

                });
                //$location.path("/place/showPlace");
                $scope.myPlaceDetail($scope.placeInfo);
            });
            $scope.showGestureSendActions = false;
            $scope.section.sendingPlace = false;
        };*/

        /*$scope.friendSent = function (friend) {

            $scope.friendInfo = friend;

            $scope.showGestureSendActionsFriends = true;
            $scope.section.sending = true;
            $scope.section.sendingFriend = true;
            $scope.magicButtonImage = friend.picture['data']['url'];
            $rootScope.sweeter.name = friend.name;
            $location.path("/place/sentFriend");
        }*/

        /*$scope.cancelGestureActionFriend = function () {
            $scope.navigateToSweetPlace();
        }*/

        /*$scope.sendSweetnessFriend = function (friend, gestureType, sweetId) {

            $scope.section.sendingFriend = false;
            $scope.showGestureSendActionsFriends = false;

            if (sweetId) $scope.newSweet.replyToSweet = sweetId;
            $scope.newSweet.receiverPhone = friend.id;
            $scope.newSweet.receiverName = friend.name;
            $scope.newSweet.receiverChannel = friend.network;
            $scope.newSweet.receiverPicture = friend.picture["data"]["url"];
            $scope.newSweet.gesture = CONSTANTS.GESTURES[0].sub_actions[2];

//            $scope.setGestureType(gestureType);

            
            $scope.newSweet.text = "";
//            $scope.newSweet.template = $scope.newSweet.gesture.template;
            sweetService.saveSweet($scope.newSweet, function (rSweet, rUserSweet) {
                $scope.safeApply(function () {
                    $scope.sweets.push(rSweet);
                    $scope.sweets.sortByProp("updatedAt");
                });
//                var message = $rootScope.sweetPerson(rSweet.get("senderName")) + " "+ rSweet.get('text') + " " +$rootScope.sweetPersonMe(rSweet.get("receiverName"),rSweet.get("senderName"));
//                sweetService.setGestureText($scope.newSweet.gestureType,1,function(text) {
                $scope.safeApply(function () {
                    facebookService.postToWall(rSweet, $scope.newSweet.gesture.facebook_template, function (success) {
                        $scope.$parent.updateLoginInfo();
                        $scope.squeezed = false;

                        setTimeout(function () {
                            $scope.section.sending = false;
                            $scope.safeApply();
                        }, 4000);

                    });
                    $scope.navigateToSweetPlace();
                    //$location.path("/place/sweetPlace");
                });

            });

        };*/

        //-------------------------------------------------------------------------------------------------------//
        //*******************************************************************************************************//
        $scope.initializeGMap = function ($scope) {

            $location.path('/place/createSweetPlace');

           

            var latlng = new google.maps.LatLng(-34.397, 150.644);
            var geocoder = new google.maps.Geocoder();
            var map = new google.maps.Map(document.getElementById('map_canvas'), {
                center:latlng,
                zoom:17,
                panControl:false,
                mapTypeControl:true,
                mapTypeControlOptions:{
                    style:google.maps.MapTypeControlStyle.DROPDOWN_MENU
                },
                zoomControl:true,
                /*zoomControlOptions: {
                 style: google.maps.ZoomControlStyle.SMALL
                 },*/
                scaleControl:false,

                mapTypeId:google.maps.MapTypeId.ROADMAP
            });

            // Try HTML5 geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);

                    /*var infowindow = new google.maps.InfoWindow({
                     map: map,
                     position: pos,
                     content: 'Location found.'
                     });*/

                    var marker = new google.maps.Marker({
                        position:pos,
                        map:map,
                        title:'Location found.'
                    });

                    map.setCenter(pos);
                }, function () {
                    $scope.handleNoGeolocation(true);
                });
            } else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
            }

            var defaultBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(-33.8902, 151.1759),
                new google.maps.LatLng(-33.8474, 151.2631)
            );

            map.fitBounds(defaultBounds);

            //--------------------------------------------------------------------------------------
            //------------------------------ Search Box --------------------------------------------
            //--------------------------------------------------------------------------------------
            /*var input = (document.getElementById('target'));
             var searchBox = new google.maps.places.SearchBox(input);
             var markers = [];

             google.maps.event.addListener(searchBox, 'places_changed', function() {
             var places = searchBox.getPlaces();
             var photos = places.photos;

             for (var i = 0, marker; marker = markers[i]; i++) {
             marker.setMap(null);
             }

             markers = [];
             var bounds = new google.maps.LatLngBounds();

             for (var i = 0, place; place = places[i]; i++) {
             var image = {
             url: place.icon,
             size: new google.maps.Size(71, 71),
             origin: new google.maps.Point(0, 0),
             anchor: new google.maps.Point(17, 34),
             scaledSize: new google.maps.Size(25, 25)
             };

             var marker = new google.maps.Marker({
             map: map,
             icon: image,
             title: place.name,
             position: place.geometry.location
             });
       

             if (i == 0 ) {
             $rootScope.placeSearchResults = [];
             $rootScope.placeSearchResults.LatLong = place.geometry.location;
             $rootScope.placeSearchResults.photo = place.photos ;
             $rootScope.placeSearchResults.gname = place.name ;
             $rootScope.placeSearchResults.icon = place.icon ;
             $rootScope.placeSearchResults.formatted_address = place.formatted_address ;
             }

             markers.push(marker);
             bounds.extend(place.geometry.location);

             }

             map.fitBounds(bounds);
             map.setZoom(14);
             });*/
            //--------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------

            //--------------------------------------------------------------------------------------
            //------------------------------ AutoComplete Box --------------------------------------------
            //--------------------------------------------------------------------------------------
            var input = (document.getElementById('target'));
            var autocomplete = new google.maps.places.Autocomplete(input);

            autocomplete.bindTo('bounds', map);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map:map
            });

            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                infowindow.close();
                marker.setVisible(false);
                //input.className = '';
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    // Inform the user that the place was not found and return.
                    //input.className = 'notfound';
                    return;
                }

                // If the place has a geometry, then present it on a map.
                //if (place.geometry.viewport) {
           
                //map.fitBounds(place.geometry.viewport);
                //} else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            
                $rootScope.placeSearchResults = [];
                $rootScope.placeSearchResults.LatLong = place.geometry.location;
                $rootScope.placeSearchResults.photo = place.photos;
                $rootScope.placeSearchResults.gname = place.name;
                $rootScope.placeSearchResults.icon = place.icon;
                $rootScope.placeSearchResults.formatted_address = place.formatted_address;
                //}
                marker.setIcon(/** @type {google.maps.Icon} */({
                    url:place.icon,
                    size:new google.maps.Size(71, 71),
                    origin:new google.maps.Point(0, 0),
                    anchor:new google.maps.Point(17, 34),
                    scaledSize:new google.maps.Size(35, 35)
                }));
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

                var address = '';
                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                infowindow.open(map, marker);
            });


            //--------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------
            //add marker on double click
            ////////////////////////////////////////////////////////////////
           /* var markersArray = [];

            google.maps.event.addListener(map, 'click', function (event) {
                //deleteOverlays();
                addMarker(event.latLng);
            });

            function addMarker(location) {
                var marker = new google.maps.Marker({
                    position:location,
                    map:map
                });
               
                getAddress(location);
                markersArray.push(marker);
            }*/

            //Deletes all markers in the array by removing references to them
            /*function deleteOverlays() {
                if (markersArray) {
                    for (var i = 0; markersArray.length; i++) {
                        markersArray[i].setMap(null);
                    }
                    markersArray.length = 0;
                }
            }*/

            function getAddress(latLng) {

                geocoder.geocode({'latLng':latLng},
                    function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                               
                            }
                            else {
                              
                            }
                        }
                        else {
                           
                        }
                    });
            }

            ///////////////////////////////////////////////////////////////
            google.maps.event.addListener(map, 'bounds_changed', function () {
                var bounds = map.getBounds();
                searchBox.setBounds(bounds);
                //autocomplete.setBounds(bounds);

                var zoom = map.getZoom();
                map.setZoom(zoom < 14 ? 14 : zoom);
                //map.setZoom(14);
               
            });

            //$location.path('/place/gmap');
            //$location.path('/place/createSweetPlace');
            google.maps.event.trigger(map, 'resize');

            window.setTimeout(function () {
                google.maps.event.trigger(map, 'resize');
            }, 1000);
        }

        $scope.handleNoGeolocation = function (errorFlag) {

            //var map = new google.maps.Map(document.getElementById('map-canvas'));

            if (errorFlag) {
                var content = 'Error: The Geolocation service failed.';
            } else {
                var content = 'Error: Your browser doesn\'t support geolocation.';
            }

            var options = {
                map:map,
                position:new google.maps.LatLng(60, 105),
                content:content,
                zoom:9
            };

            var infowindow = new google.maps.InfoWindow(options);
            map.setCenter(options.position);
        }


        //*******************************************************************************************************//
        //-------------------------------------------------------------------------------------------------------//

        //alpha
        /*$scope.follow = function (place){

            $scope.followSweet = [];
          

            $scope.followSweet.username = userService.currentUser().get("username");
            $scope.followSweet.userid = userService.currentUser().id ;
            $scope.followSweet.facebookid = userService.currentUser().get("authData")["facebook"]["id"] ;
            $scope.followSweet.placename = place.get("placeName") ;
            $scope.followSweet.placeSweetName = place.get("placeSweetName") ;
            $scope.followSweet.userpic = place.get("userPic");
            $scope.followSweet.icon = place.get("icon");

            sweetService.savePlaceFollower($scope.followSweet, function () {
            
                $scope.myPlaceDetail(place);
            });
        }*/

        //alpha
        /*$scope.unfollow = function (place){

            $scope.followSweet = [];
           

            $scope.followSweet.username = userService.currentUser().get("username");
            $scope.followSweet.userid = userService.currentUser().id ;
            $scope.followSweet.facebookid = userService.currentUser().get("authData")["facebook"]["id"] ;
            $scope.followSweet.placename = place.get("placeName") ;
            $scope.followSweet.placeSweetName = place.get("placeSweetName") ;

            sweetService.deletePlaceFollower($scope.followSweet, function () {
            
                $scope.myPlaceDetail(place);
            });

        }*/

        /*if (userService.currentUser().get("authData")) {
           
            var sweet = interactionService.getSweetForInteraction();
            if (sweet) {
                $scope.sweetForInteraction(sweet);
//                interactionService.setSweetForInteraction(null);
            }
            $scope.loadSocialNetworks(function (done) {
                if (!sweet) {
                    $scope.setMe();
                }
                interactionService.setSweetForInteraction(null);
            });

//          $scope.getUserSweets();
        }*/

        //blue
        $scope.setVisibility = function(){
           
            $location.path("/kiosk/register_visibility");
        }

        $scope.showCalendar = function(){
           
            $location.path("/kiosk/calendar");
        }

        $scope.showDay = function(){
            
            $location.path("/kiosk/day");
        }
        
         
        
        //blue
        $scope.kioskRegisterCancel = function(){
          
            userService.logout();
            $scope.clearDataLogin();
            $scope.safeApply(function () {
                 if($rootScope.pageUserFlag == true){
 
 		$location.path("#/"+ $rootScope.userAddedPlace);
 		} else {
 		//$location.path(CONSTANTS.ROUTES.AUTH);
 		window.location = CONSTANTS.ROUTES.AUTH;
 		window.location.reload();
 		}
            });
        }

        $scope.kioskRegister = function(){
          
            if ($rootScope.pageUserFlag == true){
               
                $scope.kioskSetUser = [];
                $scope.kioskSetUser.fullName = $scope.kiosk.fullname ;
                $scope.kioskSetUser.vocation = $scope.kiosk.vocation ;
                $scope.kioskSetUser.email = $scope.kiosk.email ;
                $scope.kioskSetUser.userPhone = $rootScope.userPName ;
                if ($rootScope.userAvatar == false || $rootScope.userAvatar == ' ' || $rootScope.userAvatar == null){
                    $scope.kioskSetUser.userAvatar = 'http://files.parse.com/7ddeea41-9b34-46f5-b20f-1e58e72ef6ee/cd45cc4f-d776-4ce5-802f-2a1bc861ef38-profile_image.png';
                    $rootScope.userAvatar = 'http://files.parse.com/7ddeea41-9b34-46f5-b20f-1e58e72ef6ee/cd45cc4f-d776-4ce5-802f-2a1bc861ef38-profile_image.png';
                } else {
                    $scope.kioskSetUser.userAvatar = $rootScope.userAvatar ;
                }

                /*userService.getUserChannelInfo($rootScope.userPName, function(result){
                 
                    //$scope.userInfo = result ;
                    sweetService.addKioskUserToPlace(result,$rootScope.currentPlace, function () {
                        userService.logout();
                        $scope.safeApply(function () {
                            $location.path("#/"+ $rootScope.currentPlace[0].get('placeName'));
                        });
                    });
                });*/
                if ($scope.editInfo == true){
                    userService.getUserChannelInfo($rootScope.userPName, function(result){
                       
                        sweetService.addKioskUserToPlace(result,$rootScope.currentPlace, function () {
                            userService.logout();
                            $scope.safeApply(function () {
                                $location.path("#/"+ $rootScope.currentPlace[0].get('placeName'));
                            });
                        });
                    });
                } else {
                    
                    sweetService.uniqueEmailCloud($scope.kioskSetUser.email , function(result) {
                        //if email address is unique return "true"
                        //if email address found return "false" mean email is not unique
                      
                        if(result == true){

                            sweetService.setKioskUser($scope.kioskSetUser, function () {
                               
                                userService.getUserChannelInfo($rootScope.userPName, function(result){
                                   
                                    sweetService.addKioskUserToPlace(result,$rootScope.currentPlace, function () {
                                        userService.logout();
                                        $scope.safeApply(function () {
                                            $location.path("#/"+ $rootScope.currentPlace[0].get('placeName'));
                                        });
                                    });
                                });
                                //$scope.kioskSetUser.placeName = $rootScope.userAddedPlace ;

                            });

                        }else{
                            $scope.safeApply(function () {
                                $rootScope.placeUserMsg = true ;
                            });
                        }
                    });
                    
                }

                //$rootScope.pageUserFlag = false ;
            } else {
              
                $scope.kioskSetUser = [];
                $scope.kioskSetUser.fullName = $scope.kiosk.fullname ;
                $scope.kioskSetUser.vocation = $scope.kiosk.vocation ;
                $scope.kioskSetUser.email = $scope.kiosk.email ;
                $scope.kioskSetUser.userPhone = $rootScope.userPName ;
                if ($rootScope.userAvatar == false || $rootScope.userAvatar == ' ' || $rootScope.userAvatar == null){
                    $scope.kioskSetUser.userAvatar = 'http://files.parse.com/7ddeea41-9b34-46f5-b20f-1e58e72ef6ee/cd45cc4f-d776-4ce5-802f-2a1bc861ef38-profile_image.png';
                    $rootScope.userAvatar = 'http://files.parse.com/7ddeea41-9b34-46f5-b20f-1e58e72ef6ee/cd45cc4f-d776-4ce5-802f-2a1bc861ef38-profile_image.png';
                } else {
                    $scope.kioskSetUser.userAvatar = $rootScope.userAvatar ;
                }

                $rootScope.infoUserChannal.fullNmae = $scope.kiosk.fullname ;
                $rootScope.infoUserChannal.email = $scope.kiosk.email ;
                $rootScope.infoUserChannal.vocation = $scope.kiosk.vocation ;

                    //if user again come(edit mode) goto place search
                    if($rootScope.editInfo == true ){
                        sweetService.setKioskUser($scope.kioskSetUser, function () {
                            $scope.searchPlaceKiosk();
                        });
                    }else{
                        /*sweetService.setKioskUser($scope.kioskSetUser, function () {
                            $scope.searchPlaceKiosk();
                        });*/
                        
                        sweetService.uniqueEmailCloud($scope.kioskSetUser.email , function(result) {
                            //if email address is unique return "true"
                            //if email address found return "false" mean email is not unique
                         
                            if(result == true){
                                sweetService.setKioskUserCloud($scope.kioskSetUser, function () {
                                    $scope.safeApply(function () {
                                        $scope.searchPlaceKiosk();
                                    });
                                });
                            }else{
                                $scope.safeApply(function () {
                                    $rootScope.placeUserMsg = true ;
                                });
                            }
                        });
                    }

            }

        }
        $scope.clearDataJoin  = function(){
            $scope.join.cell = null;
            $scope.join.code = null;
        }
        $scope.kioskRegisterJoin = function(){
           
            //if ($rootScope.pageUserFlag == true){
               
                
                if($scope.kiosk.fullname == '' ||$scope.kiosk.email == '' || $scope.kiosk.vocation == '' || $scope.kiosk.fullname == null || $scope.kiosk.email == null || $scope.kiosk.vocation == null){
                
                }
                else {
                
                $scope.kioskSetUser = [];
                $scope.kioskSetUser.fullName = $scope.kiosk.fullname ;
                $scope.kioskSetUser.vocation = $scope.kiosk.vocation ;
                $scope.kioskSetUser.email = $scope.kiosk.email ;
                $scope.kioskSetUser.userPhone = $rootScope.userPName ;
                if ($rootScope.userAvatar == false || $rootScope.userAvatar == ' ' || $rootScope.userAvatar == null){
                    $scope.kioskSetUser.userAvatar = 'http://files.parse.com/7ddeea41-9b34-46f5-b20f-1e58e72ef6ee/698f766f-0603-4a7b-b91d-1b9c75fc385c-capture-img2.png';
                    $rootScope.userAvatar = 'http://files.parse.com/7ddeea41-9b34-46f5-b20f-1e58e72ef6ee/698f766f-0603-4a7b-b91d-1b9c75fc385c-capture-img2.png';
                } else {
                    $scope.kioskSetUser.userAvatar = $rootScope.userAvatar ;
                }

                /*userService.getUserChannelInfo($rootScope.userPName, function(result){
             

                 //$scope.userInfo = result ;
                 sweetService.addKioskUserToPlace(result,$rootScope.currentPlace, function () {
                 userService.logout();
                 $scope.safeApply(function () {
                 $location.path("#/"+ $rootScope.currentPlace[0].get('placeName'));
                 });
                 });
                 });*/
                if ($rootScope.editInfo == true){
                  
                    userService.getUserChannelInfo($rootScope.userPName, function(result){
                       
                        sweetService.addKioskUserToPlace2(result,$rootScope.currentPlace, function (result) {
                         
                            userService.logout();
                            $scope.safeApply(function () {
                                $rootScope.editInfo = false ;
                                $location.path($rootScope.currentPlace.placeName);
                            });
                        });
                    });
                } else {
                    sweetService.uniqueEmailCloud($scope.kioskSetUser.email , function(result) {
                        //if email address is unique return "true"
                        //if email address found return "false" mean email is not unique
                    
                        if(result == true){
                               
                                sweetService.setKioskUserCloud($scope.kioskSetUser, function () {


                                    userService.getUserChannelInfo($rootScope.userPName, function(result){
                                       
                                        sweetService.addKioskUserToPlace2(result,$rootScope.currentPlace, function (result) {
                                           
                                            userService.logout();
                                            $scope.safeApply(function () {
                                                $rootScope.editInfo = false ;
                                                $location.path($rootScope.currentPlace.placeName);
                                            });
                                        });
                                    });
                                    //$scope.kioskSetUser.placeName = $rootScope.userAddedPlace ;
                                });
                        }else{
                                    $scope.safeApply(function () {
                                        $rootScope.placeUserMsg = true ;
                                    });
                                }
                            });
                }
                }
                //$rootScope.pageUserFlag = false ;
            //}
            $scope.clearDataJoin();

        }
        
        $scope.kioskRegisterUpdate = function(){
           
                $scope.kioskSetUser = [];
                $scope.kioskSetUser.fullName = $scope.kiosk.fullname ;
                $scope.kioskSetUser.vocation = $scope.kiosk.vocation ;
                $scope.kioskSetUser.email = $scope.kiosk.email ;
                $scope.kioskSetUser.userPhone = $rootScope.userPName ;
                $scope.kioskSetUser.userAvatar = $rootScope.userAvatar ;

                $rootScope.infoUserChannal.fullNmae = $scope.kiosk.fullname ;
                $rootScope.infoUserChannal.email = $scope.kiosk.email ;
                $rootScope.infoUserChannal.vocation = $scope.kiosk.vocation ;
               

                /*sweetService.setKioskUser($scope.kioskSetUser, function (userInfo) {
                    //$scope.searchPlaceKiosk();
                    $scope.kioskSetUser.userID = userService.currentUser().id ;

                    sweetService.updateKioskUserPlaces($scope.kioskSetUser, function (result){
                   
                    });
                    sweetService.getCreatedPlaces($rootScope.infoUserChannal.userId, function (placeUserSweets) {

                        if(placeUserSweets.length == 0){
                            if($rootScope.editInfo == true ){
                                $scope.safeApply(function () {
                                    $scope.searchPlaceKiosk();
                                });
                                
                            }else{
                                $scope.safeApply(function () {
                                    $scope.searchPlaceKiosk();
                                });
                            }
                            
                        }else{

                            $rootScope.newplaceid = placeUserSweets[0].id;

                            var id = placeUserSweets[0].get('placeName') ;
                            var lastSix = id.substr(id.length - 6);
                            var pname = id.substr(0, id.length - 6);
                            $rootScope.hiddennum = lastSix ;

                            $rootScope.placeAvatar = placeUserSweets[0].get('placePhoto');
                            $rootScope.placeSearchResults.placeName = placeUserSweets[0].get('placeName');
                            $rootScope.placeSearchResults.placeSweetName = placeUserSweets[0].get('placeSweetName');
                            $rootScope.placeSearchResults.kioskthankyoutitle = placeUserSweets[0].get('placeTitle');
                            $rootScope.placeSearchResults.gname = pname;
                            //$rootScope.placeSearchResults.gname = placeUserSweets[0].get('gname');
                            //$rootScope.placeSearchResults.LatLong = placeUserSweets[0].get('LatLong') ;
                            $rootScope.placeSearchResults.icon = placeUserSweets[0].get('icon');
                            $rootScope.placeSearchResults.formatted_address = placeUserSweets[0].get('address');
                            
                            $scope.previewdisable = true;
                            $rootScope.editInfo = true;
                            $scope.safeApply(function () {
                                $location.path('/kiosk/claimPlaceCreated');
                            });
                        }
                    });
                });*/
            
            sweetService.uniqueEmailEditCloud($scope.kiosk.email ,userService.currentUser().id, function(result) {
                //if email address is unique return "true"
                //if email address found return "false" mean email is not unique
            
                 if (result == true){
                     sweetService.setKioskUser($scope.kioskSetUser, function (userInfo) {
                         //$scope.searchPlaceKiosk();
                        
                         $scope.kioskSetUser.userID = userService.currentUser().id ;

                         sweetService.updateKioskUserPlaces($scope.kioskSetUser, function (result){
                          
                         });


                         sweetService.getCreatedPlaces($rootScope.infoUserChannal.userId, function (placeUserSweets) {


                             if(placeUserSweets.length > 0){

                       
                                 $rootScope.newplaceid = placeUserSweets[0].id;

                                 var id = placeUserSweets[0].get('placeName') ;
                                 var lastSix = id.substr(id.length - 6);
                                 var pname = id.substr(0, id.length - 6);
                                 $rootScope.hiddennum = lastSix ;

                                 $rootScope.placeAvatar = placeUserSweets[0].get('placePhoto');
                                 $rootScope.placeSearchResults.placePhoto = placeUserSweets[0].get('placePhoto');
                                 $rootScope.placeSearchResults.placeName = placeUserSweets[0].get('placeName');
                                 $rootScope.placeSearchResults.kioskthankyoutitle = placeUserSweets[0].get('placeTitle');
                                 $rootScope.placeSearchResults.gname = pname;
                                 $rootScope.placeSearchResults.placeSweetName = placeUserSweets[0].get('placeSweetName');
                                 //$rootScope.placeSearchResults.gname = placeUserSweets[0].get('gname');
                                 //$rootScope.placeSearchResults.LatLong = placeUserSweets[0].get('LatLong') ;
                                 $rootScope.placeSearchResults.icon = placeUserSweets[0].get('icon');
                                 $rootScope.placeSearchResults.formatted_address = placeUserSweets[0].get('address');

                                 $scope.previewdisable = true;

                                 $scope.safeApply(function () {
                                    $location.path('/kiosk/claimPlaceCreated');
                                 });

                             } else {
                                 $scope.safeApply(function () {
                                    $scope.searchPlaceKiosk();
                                 });
                             }
                         });
                     });
                 }else{
                     $scope.safeApply(function () {
                         $rootScope.placeUserMsg = true ;
                     });
                 }
            });

        }

        $scope.showSearchKiosk = function () {
            
             /*$scope.setMe();
             $scope.$parent.setLastVisitedPage();*/
            $scope.loadPlace();
            $location.path('/kiosk/search');
        }
        
        $scope.editProfile = function(){
            $rootScope.editInfo = true ;
            $location.path('/kiosk/register');
        }
        
        $scope.searchPlaceKiosk = function () {

            //$location.path('/kiosk/createSweetPlace');
            $scope.showClaim = false ;
            $scope.initializeGMapKiosk($scope);
            
            //alert("Search Place");
        };

        //-------------------------------------------------------------------------------------------------------//
        //*************************************** Kiosk Google Map Initlization *********************************//
        $scope.initializeGMapKiosk = function ($scope) {

            $location.path('/kiosk/createSweetPlace');

            $scope.placeListing = [];
            $rootScope.placeSearchResults = [];

            var latlng = new google.maps.LatLng(-34.397, 150.644);
            var geocoder = new google.maps.Geocoder();
            var map,mapOptions,pos;
            /*var map = new google.maps.Map(document.getElementById('map_canvas'), {
                center:latlng,
                zoom:17,
                panControl:false,
                mapTypeControl:true,
                mapTypeControlOptions:{
                    style:google.maps.MapTypeControlStyle.DROPDOWN_MENU
                },
                zoomControl:true,
                /*zoomControlOptions: {
                 style: google.maps.ZoomControlStyle.SMALL
                 },*/
                /*scaleControl:false,

                mapTypeId:google.maps.MapTypeId.ROADMAP
            });*/

           
            //alert("Map Set");
            // Try HTML5 geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);
                    mapOptions = {
                        center:pos,
                        zoom:17,
                        panControl:false,
                        mapTypeControl:true,
                        mapTypeControlOptions:{
                            style:google.maps.MapTypeControlStyle.DROPDOWN_MENU
                        },
                        zoomControl:true,
                        scaleControl:false,
                        mapTypeId:google.maps.MapTypeId.ROADMAP
                        };

                     map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions); 
                    
                    //--------------------------------------------------------------------------------------
            //------------------------------ AutoComplete Box --------------------------------------------
            //--------------------------------------------------------------------------------------
            var input = (document.getElementById('target'));
            var autocomplete = new google.maps.places.Autocomplete(input);

            autocomplete.bindTo('bounds', map);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker ({
                map:map
            });
            
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                infowindow.close();
                marker.setVisible(false);
                //input.className = '';
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    // Inform the user that the place was not found and return.
                    //input.className = 'notfound';
                    return;
                }

                // If the place has a geometry, then present it on a map.
                //if (place.geometry.viewport) {
               
                //map.fitBounds(place.geometry.viewport);
                //} else {
                map.setCenter(place.geometry.location);
                map.setZoom(12);

              

                $rootScope.placeSearchResults.LatLong = place.geometry.location;
                //$rootScope.placeSearchResults.photo = place.photos;
                $rootScope.placeSearchResults.gname = place.name;
                $rootScope.placeSearchResults.placeSweetName = place.name;
                $rootScope.placeSearchResults.icon = place.icon;
                $rootScope.placeSearchResults.formatted_address = place.formatted_address;
                $rootScope.placeSearchResults.kioskthankyoutitle = "Love your barista? Say thank you!" ;
               

                $scope.placeClaim($rootScope.placeSearchResults);

                //}
                marker.setIcon(/** @type {google.maps.Icon} **/ ({
                    url:place.icon,
                    size:new google.maps.Size(71, 71),
                    origin:new google.maps.Point(0, 0),
                    anchor:new google.maps.Point(17, 34),
                    scaledSize:new google.maps.Size(35, 35)
                }));
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

                var address = '';
                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                infowindow.open(map, marker);
            });

            //--------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------
                    /*var infowindow = new google.maps.InfoWindow({
                     map: map,
                     position: pos,
                     content: 'Location found.'
                     });*/

                    google.maps.event.addListener(map, 'idle', function(){
                        //alert("Resize Called!");
                        google.maps.event.trigger(map, 'resize');
                    });
                    
                    var marker = new google.maps.Marker({
                        position:pos,
                        map:map,
                        title:'Location found.'
                    });

                    //map.setCenter(pos);
                }, function () {
                    $scope.handleNoGeolocation(true);
                });
            } else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
            }

          
            
            /*var defaultBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(-33.8902, 151.1759),
                new google.maps.LatLng(-33.8474, 151.2631)
            );

            map.fitBounds(defaultBounds);*/

            //--------------------------------------------------------------------------------------
            //------------------------------ Search Box --------------------------------------------
            //--------------------------------------------------------------------------------------
            /*var markers = [];
            var infowindow =  new google.maps.InfoWindow({
                content: "",
                maxWidth: 160,
                maxHeight: 200
            });

            // Create the search box and link it to the UI element.
            var input = (document.getElementById('target'));
            //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var searchBox = new google.maps.places.SearchBox((input));

            // Listen for the event fired when the user selects an item from the
            // pick list. Retrieve the matching places for that item.
            google.maps.event.addListener(searchBox, 'places_changed', function() {
                var places = searchBox.getPlaces();

                for (var i = 0, marker; marker = markers[i]; i++) {
                    marker.setMap(null);
                }

                // For each place, get the icon, place name, and location.

                markers = [];
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0, place; place = places[i]; i++) {

                
                    var image = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    var marker = new google.maps.Marker({
                        map: map,
                        icon: image,
                        title: place.name,
                        position: place.geometry.location,
                        address: place.formatted_address
                    });

                    markers.push(marker);
                    //var data = "Place Name: " + place.name + " \n " + place.formatted_address + "\n " + place.id;
                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    
                            infowindow.setContent(marker.title + "\n" + marker.address + "\n" + marker.getPosition());
                            infowindow.open(map, marker);
                        }
                    })(marker, i));

                    google.maps.event.addListener(marker, 'dblclick', (function(marker, i) {

                        return function() {
                         
                            $rootScope.placeSearchResults.LatLong = marker.getPosition();
                            //$rootScope.placeSearchResults.photo = place.photos;
                            $rootScope.placeSearchResults.gname = marker.title;
                            $rootScope.placeSearchResults.icon = marker.icon;
                            $rootScope.placeSearchResults.formatted_address = marker.address;
                            $rootScope.placeSearchResults.kioskthankyoutitle = "Love your barista?say thank you!" ;
                         

                            $scope.placeClaim($rootScope.placeSearchResults);
                        }
                    })(marker, i));

                    if(place.formatted_address == document.getElementById('target').value){
                      
                        infowindow.open(map,marker);
                    }
                    bounds.extend(place.geometry.location);
                }

                map.fitBounds(bounds);
            });*/
            //--------------------------------------------------------------------------------------
            //--------------------------------------------------------------------------------------

            
            //add marker on double click
            ////////////////////////////////////////////////////////////////
            var markersArray = [];

            /*google.maps.event.addListener(map, 'click', function (event) {
                //deleteOverlays();
                addMarker(event.latLng);
            });*/

            /*function addMarker(location) {
                var marker = new google.maps.Marker({
                    position:location,
                    map:map
                });
             
                getAddress(location);
                markersArray.push(marker);
            }*/

            //Deletes all markers in the array by removing references to them
            /*function deleteOverlays() {
                if (markersArray) {
                    for (var i = 0; markersArray.length; i++) {
                        markersArray[i].setMap(null);
                    }
                    markersArray.length = 0;
                }
            }*/

            ///////////////////////////////////////////////////////////////
            google.maps.event.addListener(map, 'bounds_changed', function () {
                var bounds = map.getBounds();
                //searchBox.setBounds(bounds);
                autocomplete.setBounds(bounds);

                var zoom = map.getZoom();
                map.setZoom(zoom < 17 ? 17 : zoom);
                //map.setZoom(14);
              
            });

            google.maps.event.trigger(map, 'resize');

            window.setTimeout(function () {
                google.maps.event.trigger(map, 'resize');
            }, 1000);
            
        }

        $scope.handleNoGeolocation = function (errorFlag) {

            //var map = new google.maps.Map(document.getElementById('map-canvas'));

            if (errorFlag) {
                var content = 'Error: The Geolocation service failed.';
            } else {
                var content = 'Error: Your browser doesn\'t support geolocation.';
            }

            var options = {
                map:map,
                position:new google.maps.LatLng(60, 105),
                content:content,
                zoom:9
            };

            var infowindow = new google.maps.InfoWindow(options);
            map.setCenter(options.position);
        }


        //*******************************************************************************************************//
        //-------------------------------------------------------------------------------------------------------//

        $scope.placeClaim = function(placeInfo) {
            $scope.placeMsg = false ;
            $scope.showClaim = true ;

            $scope.$apply();
        }

        $scope.placeClaimBack = function () {
                
                $rootScope.editInfo = true;
//            if($rootScope.editInfo == true){
//                $location.path(CONSTANTS.ROUTES.KIOSK_REGISTER);
//            }else{
                $scope.placeMsg = false ;
                $location.path(CONSTANTS.ROUTES.KIOSK_REGISTER);
//                $scope.searchPlaceKiosk();
            //}

        }
        $scope.empty = function(kiosk){
            $scope.kiosk.address=null;
        }
        $scope.creatPlaceKiosk = function(kiosk) {
            $scope.previewdisable = true;
            $scope.newPlace = [];
            $rootScope.currentPlace = [];

            //$scope.newPlace.placeName = kiosk.name;
            $scope.newPlace.placeTitle = $rootScope.placeSearchResults.kioskthankyoutitle;
            $scope.newPlace.placeSweetName = $rootScope.placeSearchResults.gname;
            //$scope.newPlace.placeAddress2 = document.getElementById("target").value;
            //$scope.newPlace.placeAddress2 = kiosk.address2;

            if ($rootScope.placeAvatar == false){
                $scope.newPlace.placePhoto = 'images/banner-2.png';
            } else {
                $scope.newPlace.placePhoto = $rootScope.placeAvatar ;
            }

            var num = Math.floor(Math.random() * 900000) + 100000;
            $rootScope.hiddennum = num;
            
            $scope.newPlace.placeDesc = '';
            $scope.newPlace.placeURL = '';
            $scope.newPlace.placeLatitude = '';
            $scope.newPlace.placeLongitude = '';

            $scope.newPlace.placeName = ((($rootScope.placeSearchResults.gname).replace(/[0-9\s\$\&\!\. ,'`:-]+/g, "")).toLowerCase()) + num;
            $scope.newPlace.LatLong = $rootScope.placeSearchResults.LatLong;
            //$scope.newPlace.photo = $rootScope.placeSearchResults.photo ;
            $scope.newPlace.gname = $rootScope.placeSearchResults.gname;
            $scope.newPlace.icon = $rootScope.placeSearchResults.icon;
            $scope.newPlace.formatted_address = $rootScope.placeSearchResults.formatted_address;

            sweetService.saveSweetPlaceParse($scope.newPlace, function (results) {
   
                $rootScope.newplaceid = results.id ;
            
                //------------use this in place info in launch place------------------------//
                $rootScope.newplaceInfoLaunch = results ;
                //------
                if(results.length === 0){
                    $scope.safeApply(function () {
                        //$rootScope.placeSearchResults.gname = $scope.newPlace.placeName ;
                        $location.path('/kiosk/claimPlaceCreated');
                    });
                }

                if (results.length > 0) {
                    $scope.placeMsg = true ;
                  
                    $rootScope.placeClaimLunch = results[0].get('placeName') ;
                    $scope.$apply();
                }
            });
            //$location.path('/kiosk/claimPlaceCreated');
        }

        // Inline editing
        $rootScope.placeSearchResults = [];
        $rootScope.placeSearchResults.kioskthankyoutitle = "Love your barista? Say thank you!";
        $scope.editorEnabledTitle = false;
        $scope.launch = false ;

        $scope.enableEditor = function() {
            $scope.editorEnabled = true;
            $scope.kiosk.editableTitle = $scope.placeSearchResults.placeSweetName ;
            $scope.kiosk.editableAddress = $scope.placeSearchResults.formatted_address ;
        };

        $scope.disableEditor = function() {
            $scope.editorEnabled = false;
        };

        $scope.saveEditKiosk = function() {
            $rootScope.placeSearchResults.placeSweetName = $scope.kiosk.editableTitle;
            //$rootScope.placeSearchResults.gname = $scope.kiosk.editableTitle;
            $rootScope.placeSearchResults.formatted_address = $scope.kiosk.editableAddress;
 
            sweetService.saveKioskPlaceEdit($rootScope.placeSearchResults,$rootScope.hiddennum,$rootScope.newplaceid, function (results) {

            });
            $scope.disableEditor();
        };


        $scope.enableEditorTitle = function() {
            $scope.editorEnabledTitle = true;
            $scope.kiosk.editablethankyouTitle = $rootScope.placeSearchResults.kioskthankyoutitle ;
        };
        $scope.disableEditorTitle = function() {
            $scope.editorEnabledTitle = false;
        };
        $scope.saveEditKioskThankyou = function() {
          

            $scope.safeApply(function () {
                $rootScope.placeSearchResults.kioskthankyoutitle = $scope.kiosk.editablethankyouTitle;
              
            });

            sweetService.saveKioskPlaceEdit2($rootScope.placeSearchResults.kioskthankyoutitle,$rootScope.newplaceid, function (results) {

            });

            $scope.disableEditorTitle();
        };


        $scope.backRegister = function(){
            $scope.previewdisable = true;
            $rootScope.placeUserMsg = false;
            $rootScope.editInfo = true;
            $location.path('/kiosk/register');
        }
        
        $scope.clearDataLogin = function () {
      
             $scope.user.phone=null;
        };
        
        $scope.launchKiosk = function(){
            $scope.section.loginInProgress_launch = true;
            
            //Add user to newly created place
            //////////////////////////////////
           

            /*$rootScope.newplaceInfoLaunch.placeName = $rootScope.placeSearchResults.gname ;
            $rootScope.newplaceInfoLaunch.address = $rootScope.placeSearchResults.formatted_address ;*/
            
            
            if ($rootScope.editInfo == true){
                sweetService.getPlacesInfo(((($rootScope.placeSearchResults.gname).replace(/[0-9\s\$\&\!\. ,'`:-]+/g, "")).toLowerCase()) + $rootScope.hiddennum, function (placeInfo) {
                   
                    $rootScope.newplaceInfoLaunch = placeInfo;
                    //$rootScope.currentPlace = placeInfo;
                    userService.getUserChannelInfo($rootScope.userPName, function(result){
                       
                        authService.chkPlaceUser($rootScope.userPName, $rootScope.newplaceInfoLaunch[0].get("placeName"), function (chkflag) {
                            if (chkflag == true){
                               
                                $scope.safeApply(function () {
                                    
                                    $scope.logoutKiosk();
                                });

                            }else{
                                       sweetService.addKioskUserToPlace(result,$rootScope.newplaceInfoLaunch, function () {
                                        $scope.safeApply(function () {
                                            $scope.logoutKiosk();
                                        });
                                        /*$scope.safeApply(function () {
                                         $location.path("#/"+ $rootScope.newplaceInfoLaunch.get("placeName"));
                                         });*/
                                        });
                           }
                        });
                    });
                });
            } else {
                sweetService.getPlacesInfo(((($rootScope.placeSearchResults.gname).replace(/[0-9\s\$\&\!\. ,'`:-]+/g, "")).toLowerCase()) + $rootScope.hiddennum, function (placeInfo) {
                  
                    $rootScope.newplaceInfoLaunch = placeInfo;
                    //$rootScope.currentPlace = placeInfo;
                    userService.getUserChannelInfo($rootScope.userPName, function(result){
                    
                        sweetService.addKioskUserToPlace(result,$rootScope.newplaceInfoLaunch, function () {
                            $scope.logoutKiosk();
                            /*$scope.safeApply(function () {
                             $location.path("#/"+ $rootScope.newplaceInfoLaunch.get("placeName"));
                             });*/
                        });
                    });

                    /*$scope.safeApply(function () {
                     $rootScope.currentPlace = placeInfo;

                     if (placeInfo[0].get("placePhoto") == '' || placeInfo[0].get("placePhoto") == null){
                     $scope.imagePlaceBanner = 'images/main-circle-img-banner.jpg';
                     } else {
                     $scope.imagePlaceBanner = placeInfo[0].get("placePhoto");
                     }

                     $scope.gustPageInfo = true;
                     });*/
                });
            }
        }
        
        $scope.launchKioskClaim = function(){
          
            userService.logout();
            $scope.safeApply(function () {
                //$location.path((($rootScope.placeSearchResults.gname).replace(/[\s\$\&\!\. ,:-]+/g, "")).toLowerCase());
                $location.path($rootScope.placeClaimLunch);
            });
        }
        
        $scope.previewKiosk = function(){
     
            if ($scope.editorEnabled == true){
                $scope.saveEditKiosk();
            }
            $scope.previewdisable = false;
            $scope.launch = true ;
        }
        
        $scope.previewBack = function(){
           
            $scope.previewdisable = true;
            $rootScope.editInfo = true;
            $scope.launch = false ;
        }
        
        $scope.logoutKiosk = function () {
           
           // var address = ($rootScope.placeSearchResults.gname).replace(" ", "");
           
            userService.logout();
            $scope.safeApply(function () {
                $rootScope.editInfo = false ;
                //$rootScope.enurl = encodeURIComponent($rootScope.placeSearchResults.gname);
               
                $scope.section.loginInProgress_launch = false;
                $location.path((($rootScope.placeSearchResults.gname).replace(/[0-9\s\$\&\!\. ,'`:-]+/g, "")).toLowerCase() + $rootScope.hiddennum);
                //$location.path($rootScope.placeSearchResults.gname);
                //b%C3%BCxa687647    %C3%A9
               
            });

        };

        $scope.$on('$viewContentLoaded', function(event) {
            $window._gaq.push(['_trackPageview', $location.path()]);
        });
    }
}

// Define our root-level controller for the application.
function AppController($window, UpdateService, $http, $log, $scope, $route, $routeParams, $location, userService,$timeout,
                       facebookService, authService, sweetService, CONSTANTS, $rootScope, interactionService, localStorageService, utilService) {

    $rootScope.publicName = {};
    $rootScope.visitorAvatar = '' ;

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    //----------------------------------------------------------------------------------------------------------
    //Public page alpha
    //----------------------------------------------------------------------------------------------------------
    $scope.currentPagePlace = 0 ;
    $scope.newSweet = [];
    $scope.counter = CONSTANTS.DEFAULT_COUNTER;
    $scope.rating = 5;
    var isStopped = false, timer, addEvents;

    $scope.timerStatus = '';
    $scope.startStatus = 'Stop';
    /*$scope.rate = 7;
    $scope.isReadonly = false;*/
    var increment = 0 ;
    var interval = 0 ;

    //alpha
    //$scope.pageSize = CONSTANTS.DEFAULT_AVATAR_PAGINATION_SIZE;
    $scope.pageSize = 8 ;

    $scope.nextPage = function () {
       
        if ((( ($scope.currentPagePlace + 1) * $scope.pageSize) < $rootScope.usersInPlaces.length ) && $scope.pageSize != $rootScope.usersInPlaces.length) {
            $scope.currentPagePlace++;
        }
       
    };

    //alpha
    $scope.prevPage = function () {
        if ($scope.currentPagePlace > 0) {
            $scope.currentPagePlace--;
        }
     
    };

    //blue
    $scope.sendPlaceGesture = function (uplace) {
      
        
        /*if ($rootScope.visitorAvatar == false ||$rootScope.visitorAvatar == '' || $rootScope.visitorAvatar == 'null' ){
            $rootScope.visitorAvatar = 'images/capture-img.png';
        }
        else{
            $rootScope.visitorAvatar = $rootScope.visitorAvatar;
        }*/
        $rootScope.visitorAvatar = '';
        $rootScope.userEmail = '';
        $scope.showPlaceFeed = false ;
        $scope.showmobileActions = false;
        $scope.wrapper = "wrapper";

        $scope.placeInfo = [];
        $scope.placeInfo = uplace;
        $rootScope.userEmail = uplace.get('email') ;

        //$scope.magicButtonImage = "http://graph.facebook.com/" + uplace.get('userID') + "/picture?width=300&height=300";//uplace.get('userPic');
        $scope.magicButtonImage = "http://fast-bayou-8907.herokuapp.com/convert?resize=300x300&source=" + uplace.get('userPic') ;
        $scope.userName = uplace.get('userName');
       
        $scope.section.sending = true;
        $scope.showPlaceGestureSendActionsPlace = true;
        //$location.path("/partials/sent");
        $scope.section.sendingPlace = true;
        $scope.section.sendingPlaceThanks = false;
        $scope.publicPlaceHeader = true;
        $scope.playBell = false;

        $scope.counterPage = 0;
        $timeout($scope.onTimeoutPage,1000); //show the timer
    }

    //blue
    $scope.cancelSweetPlace = function(){
        $scope.showPlaceFeed = true ;
        $scope.wrapper = "wrapper-feeds-place";
        $scope.section.sending = false;
        $scope.section.sendingPlaceThanks = false;
        $scope.showPlaceGestureSendActionsPlace = false;
        $scope.section.sendingPlace = false;
        $scope.publicPlaceHeader = false;
        //$scope.playBell = false;

        $scope.counterPage = 'gotofeedback';
        $timeout($scope.onTimeoutPage,1000); //show the timer
    }

    //blue
    $scope.onTimeoutPage = function(){
    
        if ($scope.counterPage == 'gotofeedback') {
          
            //$scope.counterPage = 'end';

        } else if ($scope.counterPage == 30 ){
             $scope.showPlaceFeed = true ;
             $scope.wrapper = "wrapper-feeds-place";
             $scope.section.sending = false;
             $scope.section.sendingPlaceThanks = false;
             $scope.showPlaceGestureSendActionsPlace = false;
             $scope.section.sendingPlace = false;
             $scope.publicPlaceHeader = false;
             $scope.playBell = false;
         } else {
            $scope.counterPage++;
            var mytimeout = $timeout($scope.onTimeoutPage,1000);
         }
     }

    //alpha
    $scope.sendSweetnessPlaceGesture = function (placeInfo, sweetId) {
        
        $scope.counterPage = 'gotofeedback';
        $timeout($scope.onTimeoutPage,1000); //show the timer
        
        $scope.safeApply(function () {
            $rootScope.thanksheading2 = false;
        });
        
        //timer.restart();

        $scope.section.sending = false;
        $scope.wrapper = "wrapper";
        $scope.showprogressline = ' ';

      
        //if(sweetId) $scope.newSweet.replyToSweet = sweetId;
        $scope.newSweet.receiverPhone = placeInfo.get("userID");
        $scope.newSweet.receiverName = placeInfo.get("userName");
        $scope.newSweet.receiverChannel = placeInfo.get("userNetwork");
        $scope.newSweet.receiverPicture = placeInfo.get("userPic");
        $scope.newSweet.placename = placeInfo.get("placeName");
        $scope.newSweet.placesweetname = placeInfo.get("placeName");


        $scope.newSweet.senderId = "miscellaneous";
        $scope.newSweet.senderName = "SweetCustomer";
        $scope.newSweet.senderPhone = "miscellaneous";
        $scope.newSweet.senderChannel = "miscellaneous";
        $scope.newSweet.senderPicture = "img/thanx.png";

        //if user not login
        if (userService.currentUser() == null) {
            $scope.newSweet.currentUser = "SweetCustomer";
            $scope.newSweet.gesture = CONSTANTS.GESTURES[0].sub_actions[3];
        } else {
            $scope.newSweet.gesture = CONSTANTS.GESTURES[0].sub_actions[2];
        }

        $scope.newSweet.text = "Thank You, all of you";

        sweetService.saveSweet($scope.newSweet, function (rSweet, rUserSweet) {
            $scope.safeApply(function () {
                $scope.sweets.push(rSweet);
                $scope.sweets.sortByProp("updatedAt");
            });

            /*$scope.safeApply(function () {
                facebookService.postToWall(rSweet, $scope.newSweet.gesture.facebook_template, function (success) {
                    //$scope.$parent.updateLoginInfo();
                    $scope.squeezed = false;

                    setTimeout(function () {
                        $scope.section.sending = false;
                        $scope.safeApply();
                    }, 4000);

                });
            });*/
        });


        sweetService.saveSweetofPlace($scope.newSweet, function (rSweet) {
         
            $rootScope.sweetofplaceid = rSweet ;
        });

        /*sweetService.getPlacesSweets(placeInfo.get("placeName"), function (placeSweets) {
    
            $scope.safeApply(function () {
                $rootScope.placeSweets = placeSweets;
            });
        });*/

        $scope.showPlaceGestureSendActionsPlace = false;
        $scope.section.sendingPlace = true;
        $scope.section.sendingPlaceThanks = true;
        //$scope.showPlaceFeed = true ;
        $scope.showmobileActions = true ;
        $scope.rating = 5; //this will show 5 filled star when mobile action is true
        $scope.ratestar = 5 ; //if user select no star then default is 5 star
        $scope.thanksheading = true ;
        $scope.thanksfooter = false ;
        $rootScope.userAvatar = false;
        //$scope.playBell = false;

        $("#" + $scope.heart).css('display', 'none');
        $("#" + placeInfo.get("userID")).css('display', 'block');
        $scope.heart =  placeInfo.get("userID") ;
       
        //$scope.counter = CONSTANTS.DEFAULT_COUNTER;
        //$timeout($scope.onTimeout,1000); //show the timer

        $scope.roundProgressData = {
            label: 0,
            percentage: 0
        }
        increment = 0 ;
        interval = 0 ;

        $scope.counter = 0;
        $timeout($scope.onTimeout,1000); //show the timer
    };

    /*$scope.onTimeout = function(){
        $scope.counter--;

        if ($scope.counter == 0){
            $scope.counter = 'end';
            *//*$scope.showmobileActions = false;
            $scope.showPlaceFeed = true ;
            $scope.section.sendingPlace = true;
            $scope.section.sending = false ;
            $scope.wrapper = "wrapper-feeds-place";*//*
            //$scope.newAuthPlace();
        } else {
            var mytimeout = $timeout($scope.onTimeout,1000);
        }

    }*/

    $scope.onTimeout = function(){

        if ($scope.counter == 'feedback') {
           
            $scope.counter = 'end';

        } else if ($scope.counter == 6) {
           
            $scope.newValue = 100 ;

            $scope.roundProgressData = {
                label: $scope.newValue,
                percentage: $scope.newValue / 100
            }

            $scope.counter = 'end';

            /*$scope.playBell = true;
            var videoElements = document.getElementById('bellSound');
            videoElements.play();*/

             $scope.showmobileActions = false;
             $scope.showPlaceFeed = true ;
             $scope.section.sendingPlace = true;
             $scope.section.sending = false ;
            //$scope.wrapper = "wrapper-feeds-place";

            /***************************************************/
            //$scope.waitcounter = 0;
            //var mywait = $timeout($scope.wait,1000);

            /***************************************************/


        } else if ($scope.counter <= 6) {
           
            $scope.counter++;
            var mytimeout = $timeout($scope.onTimeout,1000);

            if( $scope.counter % 1 == 0 ) {

               
                increment = increment + 16.667;
                $scope.newValue = increment ;

                $scope.roundProgressData = {
                    label: $scope.newValue,
                    percentage: $scope.newValue / 100
                }
            }

        }

    }

    $scope.wait = function(){

        $scope.waitcounter++;
        if ($scope.waitcounter == 2) {
         
            $scope.showmobileActions = false;
            $scope.showPlaceFeed = true ;
            $scope.section.sendingPlace = true;
            $scope.section.sending = false ;

        } else {
            $timeout($scope.wait,1000);
        }

    }

    $scope.saveRatingToServer = function(rating) {
        //$window.alert('Rating selected - ' + rating);
        $scope.ratestar = rating ;
    };

    $scope.user = {
        fullName:null,
        mobile:null
    };

    $scope.clearData = function () {
        $scope.user = {
            fullName:null,
            mobile:null
        };
    };

    //alpha
    $scope.newAuthPlace = function (userFname) {

        $scope.wrapper = "wrapper-feeds-place";

        
        var emotion='' ;
        var emoticons='' ;
        if($scope.user.chkEmotion4 == true){
            emotion += 'Genius ';
            emoticons += "<br> You are a genius!";
        }
        if($scope.user.chkEmotion2 == true){
            emotion += 'Cheerful ';
            emoticons += "<br> You are so cheerful :)";
        }
        if($scope.user.chkEmotion5 == true){
            emotion += 'Rockstar';
            emoticons += "<br> You are a rockstar!!!";
        }

        $scope.newSweet.senderName = "SweetCustomer";
        $scope.newSweet.comment = $scope.user.comment;
        $scope.newSweet.rating = $scope.ratestar;
        $scope.newSweet.check = $scope.user.chkbox ;
        $scope.newSweet.emotion = emotion ;
        $scope.newSweet.emoticons = emoticons ;

//        if ($rootScope.userEmail == '' || $rootScope.userEmail == null){
//            $scope.newSweet.useremail= $rootScope.currentPlace[0].get('email');
//        } else {
//            $scope.newSweet.useremail = $rootScope.userEmail ;
//        }

        if ($scope.user.name == '' || $scope.user.name == null){
            $scope.newSweet.username = '';
        }else {
            $scope.newSweet.username = $scope.user.name;
        }

        // we are geting email instead of mobile number
        if ($scope.user.mobile == '' || $scope.user.mobile == null){
            $scope.newSweet.mobile = ' ';
        } else {
            $scope.newSweet.mobile = $scope.user.mobile;
        }

        if ($rootScope.visitorAvatar == false){
            $scope.newSweet.senderPicture = "img/thanx.png";
        } else {
            $scope.newSweet.senderPicture = $rootScope.visitorAvatar;
        }
      
        sweetService.placesCustomerComm($scope.newSweet, function () {
           
            /*$scope.safeApply(function () {
                $rootScope.placeSweets = placeSweets;
            });*/
        });

        // send sms
        //authService.createAuthPP($scope.user.mobile, "NoName");

        //get place email address
        
//        if ($rootScope.currentPlace[0].get('email') == null || $rootScope.currentPlace[0].get('email') == '') {
//            var bccEmail = 'sweetest@sweetness.io';
//        }else {
//            var bccEmail = $rootScope.currentPlace[0].get('email');
//        }

        var rEmail = $rootScope.userEmail ;
//        if( !$scope.isValidEmailAddress( $scope.newSweet.mobile ) ){
//            $scope.newSweet.mobile = '' ;
//        }
    console.log("REMAIL: " + rEmail);
      

        $scope.newSweet.owneremail = $rootScope.owneremail;
        $scope.newSweet.emailFname = userFname.split(" ")[0];
        $scope.newSweet.fromEmail = 'thankyou@sweetness.io';
        $scope.newSweet.receiverEmail = rEmail ;//'kashif.abdullah@virtual-force.com'; //'sweetest@sweetness.io';
        
        //$scope.newSweet.bccEmail = bccEmail ;
        $scope.newSweet.subject = "You got a message";

        // if user not giving any comment. No email send
        if ($scope.user.comment == '' || $scope.user.comment == null || emoticons == ''){
           
        }else {
            sweetService.sendCommentEmail($scope.newSweet, function (success) {
               
            });

            //send email
            //send email to user as well
            if( $scope.isValidEmailAddress( $scope.newSweet.mobile ) ){
             
                $scope.newSweet.subject = "Thanks for your message";

                sweetService.sendEmailToUser($scope.newSweet, function (success) {
                 
                });
            }
        }

        $scope.clearData();

        $scope.roundProgressData = {
            label: 0,
            percentage: 0
        }
        increment = 0 ;
        interval = 0 ;
        $scope.counter = 0;
        $timeout($scope.onTimeout,1000); //show the timer

        $scope.feedbackform = false;
        $rootScope.placeUserMsg = false ;
        //$scope.showmobileActions = false;
        //$scope.showPlaceFeed = true ;
        //$scope.section.sendingPlace = true;
        $scope.section.sending = false ;
        //$scope.publicPlaceHeader = false;
        $scope.thanksheading = false ;
        $scope.thanksfooter = true ;
        $scope.safeApply(function () {
            $rootScope.thanksheading2 = false;
        });
        $scope.playBell = false;
    };

    $scope.isValidEmailAddress = function (emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    $scope.newAuthPlaceCancel = function () {
       
        
        //$scope.wrapper = "wrapper-feeds-place";

        /*$scope.showmobileActions = false;
        $scope.showPlaceFeed = true ;
        $scope.section.sendingPlace = true;
        $scope.section.sending = false ;
        $scope.publicPlaceHeader = false;
        $scope.feedbackform = false;
        $scope.thanksheading = false ;
        $scope.thanksfooter = false ;*/

        $scope.clearData();

        $scope.roundProgressData = {
            label: 0,
            percentage: 0
        }
        increment = 0 ;
        interval = 0 ;
        $scope.counter = 0;
        $timeout($scope.onTimeout,1000); //show the timer

        $scope.feedbackform = false;
        //$scope.showmobileActions = false;
        //$scope.showPlaceFeed = true ;
        //$scope.section.sendingPlace = true;
        $scope.section.sending = false ;
        //$scope.publicPlaceHeader = false;
        $scope.thanksheading = false ;
        $scope.safeApply(function () {
            $rootScope.thanksheading2 = false;
        });
        $scope.thanksfooter = true ;
        $scope.playBell = false;

    };

    $scope.feedback = function () {

       
        $scope.feedbackform = true;

        $scope.counter = 'feedback';
        $timeout($scope.onTimeout,1000); //show the timer

        /*$scope.showmobileActions = false;
        $scope.showPlaceFeed = true ;
        $scope.section.sendingPlace = true;
        $scope.section.sending = false ;
        $scope.publicPlaceHeader = false;*/
    };

    /************************************************************/
    /*call from sweetfileselect directive */
    /************************************************************/
    $scope.$on('feedbackImg_upload', function() {
      

        $scope.counter = 'feedback';
        $timeout($scope.onTimeout,1000); //show the timer
    });
    $scope.$on('feedbackImg_progress', function() {
       
        $rootScope.loginInProgress_place = true;

        
    });
    
    $scope.$on('feedbackImg_profile', function() {
      
        $rootScope.loginInProgress_profile = false;

        
    });

    $scope.$on('feedbackImg_uploaded', function() {
       
        $scope.showprogressline = 'strip-line';

        $scope.roundProgressData = {
            label: 0,
            percentage: 0
        }
        increment = 0 ;
        interval = 0 ;
        $scope.counter = 0;
        $timeout($scope.onTimeout,1000); //show the timer
    });
    /************************************************************/


    $scope.$on('$viewContentLoaded', function(event) {
        $window._gaq.push(['_trackPageview', $location.path()]);
        //mixpanel.track(['_trackPageview', $location.path()]);
        mixpanel.track(['_trackPageview']);
    });

    /************************************************************************/
    /*                      Timer Handler                                   */
    /************************************************************************/

  
    $rootScope.$on('timer_initialized', function() {
        timer = angular.element('.timer').scope();
        addEvents();
      
    });

    /*addEvents = function() {
        timer.$on('timer_started', function() {
            $scope.startStatus = 'Stop';
            $scope.timerStatus = 'Started';
            isStopped = false;
        });

        timer.$on('timer_stopped', function() {
            $scope.startStatus = 'Start';
            $scope.timerStatus = 'Stopped';
            isStopped = true;
        });

        timer.$on('timer_ended', function() {
            $scope.startStatus = 'Start';
            $scope.timerStatus = 'Timer Ended!';
            isStopped = true;
            $scope.showmobileActions = false;
            $scope.showPlaceFeed = true ;
            $scope.section.sendingPlace = true;
            $scope.section.sending = false ;
            $scope.wrapper = "wrapper-feeds-place";
        });
    };*/

    $scope.restart = function() {
        timer.restart();
    };

    $scope.toggleStop = function() {
        timer[isStopped? 'start': 'stop']();
    };
    /***********************************************************************/


    //----------------------------------------------------------------------------------------------------------
    // End public page alpha
    //----------------------------------------------------------------------------------------------------------

    $scope.updateLoginInfo = function () {

        $log.info("---Updating Login Info---");

        $scope.loggedInUser = userService.currentUser();
        var userLoggedIn = $scope.loggedInUser ? true : false;

      

        $scope.isUserLoggedIn = userLoggedIn;

        /*if ($scope.loggedInUser && $scope.loggedInUser.get("authData")["facebook"]) {
            $scope.isFacebookAuthorized = true;
            $scope.facebookAuthorization = $scope.loggedInUser.get("authData")["facebook"];
        }*/

        var renderAction = $route.current.action;

        if($scope.loggedInUser){
            $scope.cssResponsive = 'css/responsive.css' ;
            $scope.cssSweet = 'css/sweet.css' ;
            $scope.cssStyle = '' ;
        
        } else {
            $scope.cssResponsive = '' ;
            $scope.cssSweet = '' ;
            $scope.cssStyle = 'css/blue/css/purple.css' ;
        
        }
   
//        var lsCurrentUser = JSON.parse(localStorage.getItem("Parse/"+CONSTANTS.PARSE_API_ID+"/currentUser")); 
//        lsCurrentUser.authData.facebook.access_token = "haha";



    };

    $scope.updateLoginInfoKiosk = function () {

        $log.info("---Updating Login Info---");

        $scope.loggedInUser = userService.currentUser();
        var userLoggedIn = $scope.loggedInUser ? true : false;

        $scope.isUserLoggedIn = userLoggedIn;

        if ($scope.renderAction == "kiosk.register" && $scope.loggedInUser){
            $scope.cssResponsive = 'css/responsive.css' ;
            $scope.cssSweet = 'css/sweet.css' ;
            $scope.cssKiosk = 'css/blue/css/kiosk.css';
            $scope.cssStyle = '' ;
        } else if($scope.loggedInUser){
            $scope.cssResponsive = 'css/responsive.css' ;
            $scope.cssSweet = 'css/sweet.css' ;
            $scope.cssKiosk = '';
            $scope.cssStyle = '' ;
        } else {
            $scope.cssResponsive = '' ;
            $scope.cssSweet = '' ;
            $scope.cssKiosk = '';
            $scope.cssStyle = 'css/blue/css/purple.css' ;
        }
    };

//    $scope.$on("user_logged_in", function() {
//        $scope.updateLoginInfo();
//    });

//  Green button navigation

    /*$scope.showTopCircle = function () {
        return $scope.isInteractionPage();
    };

    $scope.isInteractionPage = function () {
        return ($scope.renderAction == "sweet.friend" || $scope.renderAction == "sweet.feed" || $scope.renderAction == "sweet.timeline"
            || $scope.renderAction == "place.feed" || $scope.renderAction == "place.timeline" || $scope.renderAction == "place.friend"
            || $scope.renderAction == "place.myplaces" || $scope.renderAction == "place.setting" || $scope.renderAction == "place.interactionp");
    };*/

    $scope.hideSearch = function () {
        //return ($scope.renderAction == "place.createsweetplace" || $scope.renderAction == "place.showplace");
    };

    $scope.hideRightBtn = function () {
        //return ($scope.renderAction == "place.createsweetplace" || $scope.renderAction == "place.showplace");
    };

    /*$scope.setLastVisitedPage = function () {
        if (!$scope.isInteractionPage()) {
            $scope.lastVisitedPage = $location.path();
        }
    };

    $scope.navigateToInteraction = function () {
        $scope.setLastVisitedPage();
        $scope.$broadcast('navigate_to_interaction');
    };

    $scope.navigateToLastVisitedPage = function () {
        $location.path($scope.lastVisitedPage);
    };*/

    /*$scope.showSearch = function () {
       
         $scope.setMe();
         $scope.$parent.setLastVisitedPage();*//*
        $scope.loadPlace();
        $location.path('/sweet/fsearch');
        //$location.path('/place/searchPlace');
    }*/

    $scope.loadPlace = function (cb) {
        $scope.places = [];
        sweetService.getPlaces(function (placeSweets) {
           
            $scope.safeApply(function () {
                $scope.places = placeSweets;
            });
        });

    };

    /*$scope.resetGestures = function () {
//        $scope.fNavigationToInteraction = false;
        $scope.setSubActionsState(false);
        $scope.$broadcast('resetGestures');
    };*/

    /*$scope.setSubActionsState = function (state) {
        $scope.sub_actions = state;
    };*/

    $scope.section = {};

    /*$scope.togglePeopleSearchBox = function () {
        $scope.section.showPeopleSearchBox = !$scope.section.showPeopleSearchBox;
    };*/

    $rootScope.info = {};
    //  $rootScope.info.title = "";
    //$rootScope.defaultError = CONSTANTS.ERROR.DEFAULT;

    $rootScope.loadUserChannel = function () {
        
        userService.loadUserChannel(userService.currentUser().id, function (rUserChannel) {
           
            $scope.safeApply(function () {
                $rootScope.userChannel = rUserChannel;
                $rootScope.sweeter.name = $rootScope.userChannel.get("fullName"); //comment by kashif undo this change
            });
        });
    };

    if (userService.currentUser()) {
        $rootScope.loadUserChannel();
    }


//    $rootScope.sweetPerson = function(sweet) {
//        if(sweet) {
//            if(sweet.get("senderId") == userService.currentUser().id) return "You";
//            else return sweet.get("senderName").split(" ")[0];
//        }
//        else return;
//    };
//
//    $rootScope.sweetPersonMe = function(sweet) {
//        if(sweet) {

//            if(sweet.get("receiverPhone") == sweet.get('senderPhone'))
//                return "yourself";
//            else if(sweet.get("receiverPhone") == userService.currentUser().get("username"))
//                return "you";
//            else
//                return sweet.get("receiverName").split(" ")[0];
//        }else {
//            return;
//        }
//    };


    /*$scope.goToHome = function () {
        window.location = "#/sweet/people";
        window.location.reload();
    }*/

    $scope.loadCanvas = function (imageBase64Contents, canvasId, width, height) {
        var canvas = document.getElementById(canvasId);
        canvas.width = canvas.width;//reset canvas;
        canvas.height = canvas.height;
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');

        var imageObj = new Image();
        imageObj.onload = function () {
            context.drawImage(imageObj, 0, 0);
        };
        imageObj.src = imageBase64Contents;
    };

    $scope.setuseravatar = function (avatar) {
      
        $rootScope.userChannel.set("avatarURL", avatar);
        $rootScope.userAvatar = $rootScope.userChannel.get("avatarURL");
        $rootScope.loadUserChannel();
    };

    /*$scope.showPreference = function () {
        $location.path("/user/preference");
    };*/

    /*$scope.userFirstName = function () {
//        return userService.currentUser().get("fullName").split(" ")[0];
    };*/

    $scope.logout = function () {
        userService.logout();
        $scope.safeApply(function () {
            $location.path(CONSTANTS.ROUTES.AUTH);
        });

    };

    $scope.clearDataLogin = function () {
          
             $scope.user.phone=null;
        };
    // Update the rendering of the page logout state.
     var renderNotLogoIn = function () {

        $scope.no_bg = "no-bg-color";
        $scope.cssResponsive = '' ;
        $scope.cssSweet = '' ;
        $scope.cssStyle = 'css/blue/css/purple.css' ;

        // Pull the "action" value out of the currently selected route.
        var renderAction = $route.current.action;
        var renderPath;
        // Also, let's update the render path so that we can start conditionally rendering parts of the page.
        if (renderAction)
            renderPath = renderAction.split(".");
        else
            renderPath = "";

        //alpha
        //Non user + logout state + this device + public pages for place and users >
        //var renderGuestAction = $route.current.action; //$location.path();
        //var renderGuestPath = renderGuestAction.split( "." );

        var isAuth = (renderPath[ 0 ] == "auth");
        var isAuthLink = (renderPath[ 0 ] == "authlink");
        var authToken = $routeParams.token;
        var isSweet = (renderPath[ 0 ] == "sweet");
        var isSweetness = (renderPath[ 0 ] == "s");
        var sweetId = $routeParams.sweetId;
        var publicPlace = (renderPath[ 0 ] == "name");//alpha

        // Store the values in the model.
//        $scope.isUserLoggedIn = userLoggedIn;
        $rootScope.renderAction = renderAction;
        $rootScope.renderPath = renderPath;
        $scope.isSweet = isSweet;
        $scope.isSweetness = isSweetness;
        $scope.sweetId = sweetId;
        $scope.isAuth = isAuth;
        $scope.authToken = authToken;
        $scope.publicPlace = publicPlace;

        switch (renderAction) {
            case "auth.new":
            case "auth.sms":
            case "auth.join":
            case "auth.launch":
            case "auth.loginpage":
                $scope.no_bg = "";
                
                break;
            /*case "sweet.friend":
            case "sweet.timeline":
            case "sweet.feed":
                $scope.wrapper = "wrapper-feeds";
                break;
            case "locations.place":
            case "name.custom":
                $scope.wrapper = "wrapper-feeds-place";
                $rootScope.sweeter.name = "Sweet Place";
                break;*/
            //case "place.sweetplace":
            /*case "place.feed":
            case "place.friend":
                $scope.wrapper = "wrapper-feeds";
                $scope.activeFeed = "active";
                $scope.activePlace = "";
                //$scope.search_btn = "search";
                break;
            case "place.timeline":
                $scope.wrapper = "wrapper-feeds";
                $scope.activeFeed = "";
                $scope.activePlace = "";
                //$scope.search_btn = "search";
                break;
            case "place.myplaces":
            case "place.interactionp":
                $scope.wrapper = "wrapper-feeds";
                $scope.activePlace = "active";
                $scope.activeFeed = "";
                //$scope.search_btn = "search";
                break;*/
            default:
                //$scope.wrapper = "wrapper";
                //$scope.activeFeed = "";
                //$scope.activePlace = "";
                $scope.no_bg = "no-bg-color";
                break;
        }

        if ( $routeParams.name != null && $routeParams.name != ''){
   
            var username = ($routeParams.name);
        } else {
       
            var username = "";

        }

        if(renderPath[1] == 'custom' && username != "" ){
     
            $rootScope.publicName = username;
    
        }
        if (username == "[object Object]"){
           
            $rootScope.publicName = '';
        }

        if($rootScope.publicName != '' && !$scope.isUserLoggedIn && $rootScope.publicName != 'u') {

       
            $scope.isPublicPage = true;
            $scope.showLogin = false;

       
            //$scope.$apply( $location.path( '/'+ $rootScope.publicName ) );

            $scope.showPlaceFeed = true ;
            $location.path('/'+ $rootScope.publicName);
            //$window.location('/'+ $rootScope.publicName);
        }

        // Non user + logout state + this device >
        //alpha
        if ($location.path() == '/' || $location.path() == '/u/auth' && !$scope.isUserLoggedIn) {
         
            $scope.showLogin = true;
            $location.path(CONSTANTS.ROUTES.AUTH);
        }

        if ($location.path() == '/u/auth/sms' && !$scope.isUserLoggedIn) {
            console.log("Rendering Step6 --->");
            //console.log("constant auth: " + CONSTANTS.ROUTES.AUTH);
            $location.path(CONSTANTS.ROUTES.AUTH_SMS);
        }
        
        if ($location.path() == '/u/auth/join' && !$scope.isUserLoggedIn) {
          
            $location.path(CONSTANTS.ROUTES.AUTH_JOIN);
        }
        
        if ($location.path() == '/u/auth/launch' && !$scope.isUserLoggedIn) {
            
            $location.path('/u/auth/launch');
        }

        if ($location.path() == '/u/auth/loginpage' && !$scope.isUserLoggedIn) {
           
            $location.path('/u/auth/loginpage');
        }

        // Non user + logout state + this device >
        if ($location.path() == '/' && !$scope.isUserLoggedIn) {
           
            $location.path(CONSTANTS.ROUTES.AUTH);
            $scope.showLogin = true;
        }

        if (isAuth && renderPath[1] == 'sms') {
        
            $scope.showLogin = true;
            $location.path(CONSTANTS.ROUTES.AUTH_SMS);
        }

        if (renderPath[1] == "custom" && $rootScope.publicName != '') {
           
            $scope.showPlaceFeed = true ;
            $rootScope.currentPlace = [];

            //var renderAction = $location.path();
            //var renderPath = renderAction.split( "/" );
            //var renderAction = $route.current.action;
            //var renderPath = renderAction.split(".");
            //var username = ($routeParams.name || "");
            //$rootScope.publicName = username;

            $scope.guestPlace = {};
            //$scope.guestPlace.placeName = username;

         
            $rootScope.placeKiosk = username ;

            /*sweetService.getPlacesSweets(username, function (placeSweets) {
           
             $scope.safeApply(function () {
             $rootScope.placeSweets = placeSweets;
             });
             });*/

            sweetService.getPlacesInfo(username, function (placeInfo) {


                $scope.safeApply(function () {
                    $rootScope.currentPlace = placeInfo;

                    if (placeInfo[0].get("placePhoto") == '' || placeInfo[0].get("placePhoto") == null){
                        $scope.imagePlaceBanner = 'images/banner-2.png';
                    } else {
                        $scope.imagePlaceBanner = placeInfo[0].get("placePhoto");
                    }

                    $scope.gustPageInfo = true;
                });
            });

            /*sweetService.getPlacestoJoin(username ,$scope.friend.id, function(placeDetailSweets) {
          
             if (placeDetailSweets.length == 0){
             $rootScope.placeJoin = true;
             } else {
             $rootScope.placeJoin = false;
             }
             });*/

            sweetService.getPlacesDetail(username, function (placeDetailSweets) {
              
                $scope.safeApply(function () {
                    $rootScope.usersInPlaces = placeDetailSweets;
                    if(placeDetailSweets.length == 0){
                        $rootScope.emptyPlacesMsg = 'Please close this app and launch it again to follow instructions on how to join this team page so that happy customers can thank you for being so awesome!';
                    } else {
                        $rootScope.emptyPlacesMsg = '';
                    }
                });
            });
            $rootScope.placeJoin = false;
            $scope.clearDataLogin();
            //$location.path("/" + username);

        }

    }

    // Update the rendering of the page.
    var render = function () {
      
        $scope.no_bg = "no-bg-color";

        $scope.safeApply(function () {
            $rootScope.latestSweet = {};
        });

        var renderGuestAction = $route.current.action; //$location.path();
        var renderGuestPath = renderGuestAction.split( "." );

        if(renderGuestPath[0] == 'kiosk'){
            //$scope.updateLoginInfoKiosk();
        } else {
            $scope.updateLoginInfo();
        }

        if($scope.loggedInUser){
            //$scope.cssResponsive = 'css/responsive.css' ;
            $scope.cssSweet = 'css/sweet.css' ;
            $scope.cssStyle = '' ;
          
        } else {
            $scope.cssResponsive = '' ;
            $scope.cssSweet = '' ;
            $scope.cssStyle = 'css/blue/css/purple.css' ;
       
        }

        //alpha
        //Non user + logout state + this device + public pages for place and users >
        /*var renderGuestAction = $route.current.action; //$location.path();
        var renderGuestPath = renderGuestAction.split( "." );
        var username = ($routeParams.name || "");*/

        //alpha
        /*if(renderGuestPath[1] == 'custom' && username != "" ){
            $rootScope.publicName = username;
            
        }
        if (username == "[object Object]"){
            $rootScope.publicName = '';
        }*/

        //alpha
        /*if($rootScope.publicName != '' && !$scope.isUserLoggedIn ) {

           
            $scope.isPublicPage = true;
            $scope.showLogin = false;

           
            //$scope.$apply( $location.path( '/'+ $rootScope.publicName ) );

            $scope.showPlaceFeed = true ;
            $location.path('/'+ $rootScope.publicName);
            //$window.location('/'+ $rootScope.publicName);
        }*/

        // Non user + logout state + this device >
        //alpha
        /*if ($location.path() == '/' || $location.path() == '/u/auth' && !$scope.isUserLoggedIn) {
        
            $location.path(CONSTANTS.ROUTES.AUTH);
            $scope.showLogin = true;
        }*/

        // Non user + logout state + this device >
        /*if ($location.path() == '/' && !$scope.isUserLoggedIn) {
       
            $location.path(CONSTANTS.ROUTES.AUTH);
            $scope.showLogin = true;
        }*/

        //Existing user + logged in + this devise >
        if ($location.path() == '/' && $scope.isUserLoggedIn) {
          
            $location.path(CONSTANTS.ROUTES.KIOSK_USERPROFILE);
        }

        // Pull the "action" value out of the currently selected route.
        var renderAction = $route.current.action;
        var renderPath;
        // Also, let's update the render path so that we can start conditionally rendering parts of the page.
        if (renderAction)
            renderPath = renderAction.split(".");
        else
            renderPath = "";

        var isAuth = (renderPath[ 0 ] == "auth");
        var isAuthLink = (renderPath[ 0 ] == "authlink");
        var authToken = $routeParams.token;
        var isSweet = (renderPath[ 0 ] == "sweet");
        var isSweetness = (renderPath[ 0 ] == "s");
        var sweetId = $routeParams.sweetId;
        var publicPlace = (renderPath[ 0 ] == "name");//alpha

        // Store the values in the model.
//        $scope.isUserLoggedIn = userLoggedIn;
        $rootScope.renderAction = renderAction;
        $rootScope.renderPath = renderPath;
        $scope.isSweet = isSweet;
        $scope.isSweetness = isSweetness;
        $scope.sweetId = sweetId;
        $scope.isAuth = isAuth;
        $scope.authToken = authToken;
        $scope.publicPlace = publicPlace;

        switch (renderAction) {
            case "sweet.friend":
            case "sweet.timeline":
            case "sweet.feed":
                $scope.wrapper = "wrapper-feeds";
                break;
            case "locations.place":
            case "name.custom":
                $scope.wrapper = "wrapper-feeds-place";
                $rootScope.sweeter.name = "Sweet Place";
                break;
            //case "place.sweetplace":
            case "place.feed":
            case "place.friend":
                $scope.wrapper = "wrapper-feeds";
                $scope.activeFeed = "active";
                $scope.activePlace = "";
                //$scope.search_btn = "search";
                break;
            case "place.timeline":
                $scope.wrapper = "wrapper-feeds";
                $scope.activeFeed = "";
                $scope.activePlace = "";
                //$scope.search_btn = "search";
                break;
            case "place.myplaces":
            case "place.interactionp":
                $scope.wrapper = "wrapper-feeds";
                $scope.activePlace = "active";
                $scope.activeFeed = "";
                //$scope.search_btn = "search";
                break;
            default:
                $scope.wrapper = "wrapper";
                $scope.activeFeed = "";
                $scope.activePlace = "";
                break;
        }

      
        /*if (publicPlace && renderPath[1] == 'custom' && !$scope.isUserLoggedIn) {
          
             //$location.path('/'+ $rootScope.publicName);
            $scope.isPublicPage = true;
            $scope.showLogin = false;
            //$rootScope.publicName = username;
        
            $location.path("/" + $rootScope.publicName);
        }*/

        if (isAuth && renderPath[1] == 'new' && $scope.isUserLoggedIn) {
     
            $location.path(CONSTANTS.ROUTES.KIOSK_USERPROFILE);
        }

        if (isAuthLink && authToken && $scope.isUserLoggedIn) {
         
            $location.path(CONSTANTS.ROUTES.KIOSK_USERPROFILE);
        }

        if (isAuth && renderPath[1] == 'sms') {
         
            $location.path(CONSTANTS.ROUTES.AUTH_SMS);
        }

//      TODO: should old auth entries deleted when requested for the new one for the same phone?
//      User clicked on SMS auth
        if (isAuthLink && authToken) {
      
            authService.authenticate(authToken, function (rUser) {
                var redirectPage;
                if (rUser) {
      
                    if (rUser.get("authData")) {
                        redirectPage = CONSTANTS.ROUTES.KIOSK_USERPROFILE;
                      
                    } else {
                        redirectPage = CONSTANTS.ROUTES.FRIENDS_DISCOVER;
                        
                    }
                }
                else {
                    redirectPage = CONSTANTS.ROUTES.AUTH;
                
                }
                //TODO: Display info message
                $scope.safeApply(function () {
                    
                    $location.path(redirectPage)
                });
            });
        }

//      existing user + logged in user + this device + cliked on sweet link
//        if($scope.isUserLoggedIn && isSweet && sweetId) {
//            This should be handled by the route /sweet/show/:sweetId in app.js
//        }

        if (!$scope.isUserLoggedIn && isSweet && sweetId) {

        }

        if (isSweet) 
        if (isSweetness)
        if (sweetId)

        //alpha
        /*if (renderPath[1] == "custom" && $rootScope.publicName != '') {

            $scope.showPlaceFeed = true ;
            $rootScope.currentPlace = [];

            //var renderAction = $location.path();
            //var renderPath = renderAction.split( "/" );
            var renderAction = $route.current.action;
            var renderPath = renderAction.split(".");
            var username = ($routeParams.name || "");
            //$rootScope.publicName = username;

            $scope.guestPlace = {};
            $scope.guestPlace.placeName = username;

          

            sweetService.getPlacesSweets(username, function (placeSweets) {
               
                $scope.safeApply(function () {
                    $rootScope.placeSweets = placeSweets;
                });
            });

            sweetService.getPlacesInfo(username, function (placeInfo) {
              
                $scope.safeApply(function () {
                    $rootScope.currentPlace = placeInfo;
                    $scope.gustPageInfo = true;
                });
            });

            *//*sweetService.getPlacestoJoin(username ,$scope.friend.id, function(placeDetailSweets) {
            
             if (placeDetailSweets.length == 0){
                $rootScope.placeJoin = true;
             } else {
                $rootScope.placeJoin = false;
             }
             });*//*

            sweetService.getPlacesDetail(username, function (placeDetailSweets) {
              
                $scope.safeApply(function () {
                    $rootScope.usersInPlaces = placeDetailSweets;
                });
            });
            $rootScope.placeJoin = false;
            //$location.path("/" + username);

        }*/
//      1. User logged in but not social authorization (call facebookLink)  2. User is not logged in (call facebook login)

        if (isSweetness && sweetId) {

            sweetService.getSweet(sweetId, function (rSweet) {
               
                if (rSweet) {
                    $scope.safeApply(function () {
                        interactionService.setSweetForInteraction(rSweet);
                        $location.path("/u/auth");
//                    if(!$scope.isUserLoggedIn) {
//                        facebookService.doLogin(function(rUser, rUserChannel) {
//                            $scope.safeApply(function() {
//                                if(rUserChannel)
//                                    $rootScope.loadUserChannel();
//
//                                $location.path("/sweet/people");
////                                $rootScope.$broadcast("sweet_interaction",rSweet);
//
//                            });
//                        });
//                    }
                        if ($scope.isUserLoggedIn && !$scope.isFacebookAuthorized) {
                            facebookService.doLink(function (rUser, rUserChannel) {
                                $scope.safeApply(function () {
                                    if (rUserChannel)
                                        $rootScope.loadUserChannel();
                                    interactionService.setSweetForInteraction(rSweet);
                                    $location.path("/sweet/people");
//                                $rootScope.$broadcast("sweet_interaction",rSweet);
                                });
                            });
                        }
                        if ($scope.isUserLoggedIn && $scope.isFacebookAuthorized) {
                            $rootScope.loadUserChannel();
                            interactionService.setSweetForInteraction(rSweet);
                            $location.path("/sweet/people");
//                        $rootScope.$broadcast("sweet_interaction",rSweet);
                        }
                    });
                }
            });
        }

        if (isSweet && sweetId && renderPath[1] == "auto") {
          
//        If user not logged in then authenticate (create user if doesn't exists

            sweetService.getSweet(sweetId, function (rSweet) {
               
                if (rSweet) {
                    $scope.safeApply(function () {
                        authService.authenticationThroughSweet(rSweet, function (loggedIn) {
                            $scope.safeApply(function () {
                                $scope.loggedInUser = userService.currentUser();
                                $scope.isUserLoggedIn = true;
                            });

                       
                            sweetService.autoAcknowledge(rSweet.id, function (rSweet, rUserSweet) {
                              
                                sweetService.sendIt(rSweet, "Sweetness Labs <sweet@sweetness.mailgun.org>", rSweet.get("text"), function (success) {
//                                    cb(success);
                                    $scope.safeApply(function () {

                                        interactionService.setInteraction(rUserSweet);
                                        $log.info("Auto: getInteraction: " + interactionService.getInteraction().get("senderName"));
                                        $log.info("Auto: getInteraction: " + interactionService.getInteraction().get("receiverName"));
                                     
//                                       if(userService.currentUser())
//                                            $rootScope.$broadcast('user_interaction');
//                                       else
                                        $location.path("/sweet/userinteraction");
                                        $rootScope.$broadcast('user_interaction');
                                    });
                                });
                            });
                        });
                    });
                } else {
                    $scope.safeApply(function () {
                       
                        if ($scope.isUserLoggedIn) $location.path("#/sweet/new");
                    });
                }
            });
        }
        $scope.showLogin = true;

    };

    // Listen for changes to the Route. When the route changes, let's set the renderAction model value so that it can render in the Strong element.
    $scope.$on(
        "$routeChangeSuccess",
        function (event, currentRoute, previousRoute) {
       
            //$scope.updateLoginInfo();
       

            /*var renderGuestAction = $route.current.action; //$location.path();
            var renderGuestPath = renderGuestAction.split( "." );
            var username = ($routeParams.name || "");
     
            /**********************************************************/
            // Pull the "action" value out of the currently selected route.
            var renderAction = $route.current.action;
            var renderPath;
            // Also, let's update the render path so that we can start conditionally rendering parts of the page.
            if (renderAction)
                renderPath = renderAction.split(".");
            else
                renderPath = "";

            var isAuthLink = (renderPath[ 0 ] == "authlink");
            var authToken = $routeParams.token;
            /**********************************************************/
            if(isAuthLink && authToken){
         
                render();
            } else if (userService.currentUser() == null) {
              
                renderNotLogoIn();
            } else {
               
                render();
            }

        }
    );
}

function AuthController($log, $scope, authService, $location, CONSTANTS, facebookService, userService, $rootScope, sweetService) {

    $scope.clearData = function () {
        $scope.user = {
            fullName:null,
            phone:null
        };
    };

    $scope.$watch($rootScope.publicName, function () {
//        StatusBar.overlaysWebView(false);
//        
//        if (StatusBar.isVisible) {
//            StatusBar.hide();
//        }
        //try {
                                      //alert('Device is ready! Make sure you set your app_id below this alert.');
                                      
                                      //FB.init({ appId: '366407670138696', nativeInterface: CDV.FB, useCachedDialogs: false });
                                      /*Parse.FacebookUtils.init({

                                        appId      : "366407670138696", // app name : sweet_localhost
                                        nativeInterface: CDV.FB,
                                        useCachedDialogs: false,
                                        status:true, // check login status
                                        cookie:true, // enable cookies to allow Parse to access the session
                                        xfbml:true, // parse XFBML
                                        oauth:true
                                    });
                                    //alert("Parse Facebook Utility Initialized!");
                                      } catch (e) {
                                      alert("Hello: "+e);
                                      }*/
       
    });
    
    $scope.newAuth = function () {

   
        authService.createAuth($scope.user.phone, $scope.user.fullName || "NoName");
        $scope.clearData();
//        TODO: add callback
        //$location.path(CONSTANTS.ROUTES.AUTH_SENT);
        //window.location = CONSTANTS.ROUTES.AUTH_SENT;
        window.location = CONSTANTS.ROUTES.AUTH_SMS;
        window.location.reload();

    };

    // send user there sms authentication code
    $scope.newAuthSms = function () {

        $rootScope.userPName = '';
        $rootScope.userPName = $scope.user.phone ; //userPName -> userPhoneName
        $rootScope.pageUserFlag = false;
        $rootScope.infoUserChannal = [] ;
        $rootScope.editInfo = false ;
        $scope.section.loginInProgress = true;

  
        var redirectPage;
        authService.createAuthSms($rootScope.userPName);
        redirectPage = CONSTANTS.ROUTES.AUTH_SMS;
        $scope.safeApply(function () {
            $scope.section.loginInProgress = false;
            $location.path(redirectPage);
        });
         /*authService.loginPhoneNumber($scope.user.phone, function (flag) {

             var redirectPage;
             //$rootScope.logedInUserInfo = [];

             if (flag == true){
               

                 userService.getUserChannelInfo($rootScope.userPName, function(result){
                   

                     $rootScope.infoUserChannal.channel = result[0].get('channel') ;
                     $rootScope.infoUserChannal.fullNmae = result[0].get('fullName') ;
                     $rootScope.infoUserChannal.userId = result[0].get('userId') ;
                     $rootScope.infoUserChannal.avatarURL = result[0].get('avatarURL') ;
                     $rootScope.infoUserChannal.email = result[0].get('email') ;

                     if (result.length > 0){
                         $scope.safeApply(function () {
                             $rootScope.editInfo = true ;
                             $rootScope.userAvatar = result[0].get('avatarURL');
                             $rootScope.$broadcast('user_registration');
                           
                         });
                     }
                 });
                 
                 redirectPage = CONSTANTS.ROUTES.KIOSK_USERPROFILE;
                 //redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER;
             } else {
            
                 authService.createAuthSms($rootScope.userPName);
                 redirectPage = CONSTANTS.ROUTES.AUTH_SMS;
             }

     

             $scope.safeApply(function () {
                
                 $scope.section.loginInProgress = false;
                 $location.path(redirectPage);
             });
         });*/

        $scope.clearData();

    };

    //user login add to place authentication
    $scope.newAuthAddUser = function () {

        $rootScope.infoUserChannal = [] ;
        $rootScope.userPName = '';
        $rootScope.userPName = $scope.user.phone ; //userPName -> userPhoneName
        $scope.section.loginInProgress = true;
        $rootScope.userAddedPlace = document.getElementById("adduser").title ;

        var placeName = document.getElementById("adduser").title ;
      
        authService.chkPlaceUser($scope.user.phone, placeName, function (chkflag) {
            if (chkflag == true){
                
                $scope.safeApply(function () {
                    $rootScope.placeUserMsg = true ;
                });

            }else{
                 var redirectPage;
 		$rootScope.pageUserFlag = true;
          
                authService.createAuthSms($rootScope.userPName);
                $rootScope.editInfo = false ;
                redirectPage = CONSTANTS.ROUTES.AUTH_SMS;
                $scope.safeApply(function () {
                    $scope.section.loginInProgress = false;
                    $location.path(redirectPage);

                });
                /*authService.loginPhoneNumber($rootScope.userPName, function (flag)     {

                    var redirectPage;
                    $rootScope.pageUserFlag = true;

                    if (flag == true){
                     

                        userService.getUserChannelInfo($rootScope.userPName, function(result){
                       
                            $rootScope.infoUserChannal.channel = result[0].get('channel') ;
                            $rootScope.infoUserChannal.fullNmae = result[0].get('fullName') ;
                            $rootScope.infoUserChannal.userId = result[0].get('userId') ;
                            $rootScope.infoUserChannal.avatarURL = result[0].get('avatarURL') ;
                            $rootScope.infoUserChannal.email = result[0].get('email') ;

                      
                            if (result.length > 0){
                                $scope.safeApply(function () {
                                    $rootScope.editInfo = true ;
                                    $rootScope.userAvatar = result[0].get('avatarURL');
                                    $rootScope.$broadcast('user_registration');
                          
                                });
                            }
                        });

                        //redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER;
                        redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER_ADDUSER;
                    } else {
                       
                        authService.createAuthSms($rootScope.userPName);
                        $rootScope.editInfo = false ;
                        redirectPage = CONSTANTS.ROUTES.AUTH_SMS;
                    }

                    $scope.safeApply(function () {
                        $scope.section.loginInProgress = false;
                        $location.path(redirectPage);

                    });
                });
                */
            }
        });

        $scope.clearData();
    };
    
    $scope.joinAuthAddUser = function () {

        $rootScope.infoUserChannal = [] ;
        $rootScope.currentPlace = [] ;
        $rootScope.userPName = '';
        $rootScope.userPName = $scope.join.cell ; //userPName -> userPhoneName
        $scope.section.loginInProgress = true;
        //$rootScope.userAddedPlace = document.getElementById("adduser").title ;

        userService.getUserInfoByChannel($scope.join.code , function(userChannelInfo) {
        
            if (userChannelInfo.length > 0){
                //Set Place Creator UserID
                $rootScope.CreatorUserID = userChannelInfo[0].get("userId") ;

                sweetService.getPlacesInfoByPhone($rootScope.CreatorUserID, function (result) {
                

                    $rootScope.currentPlace.LatLong = result[0].get("LatLong");
                    $rootScope.currentPlace.gname = result[0].get("gname");
                    $rootScope.currentPlace.placeSweetName = result[0].get("placeSweetName");
                    $rootScope.currentPlace.placeName = result[0].get("placeName");
                    $rootScope.currentPlace.icon = result[0].get("icon");
                    $rootScope.currentPlace.formatted_address = result[0].get("address");
                    $rootScope.currentPlace.kioskthankyoutitle = result[0].get("placeTitle") ;
                    $rootScope.currentPlace.placeCreatorId = result[0].get("placeCreatorId") ;

             

                    authService.chkPlaceUser($scope.join.cell, $rootScope.currentPlace.placeName, function (chkflag) {
                        if (chkflag == true){

                       

                            $scope.safeApply(function () {
                                $rootScope.placeUserMsg = true ;
                            });

                        }else{

                            var redirectPage;
                            $rootScope.pageUserFlag = true;
                            $rootScope.editInfo = false ;

                            authService.createAuthSms($rootScope.userPName);

                            redirectPage = CONSTANTS.ROUTES.AUTH_SMS;

                            $scope.safeApply(function () {
                                $scope.section.loginInProgress = false;
                                $location.path(redirectPage);

                            });
                            /*authService.loginPhoneNumber($rootScope.userPName, function (flag)     {

                                var redirectPage;
                                $rootScope.pageUserFlag = true;

                                if (flag == true){
                                   

                                    userService.getUserChannelInfo($rootScope.userPName, function(result){
                                    

                                        $rootScope.infoUserChannal.channel = result[0].get('channel') ;
                                        $rootScope.infoUserChannal.fullNmae = result[0].get('fullName') ;
                                        $rootScope.infoUserChannal.userId = result[0].get('userId') ;
                                        $rootScope.infoUserChannal.avatarURL = result[0].get('avatarURL') ;
                                        $rootScope.infoUserChannal.email = result[0].get('email') ;
                                        $rootScope.infoUserChannal.vocation = result[0].get('vocation') ;

                                  
                                        if (result.length > 0){
                                            $scope.safeApply(function () {
                                                $rootScope.editInfo = true ;
                                                $rootScope.userAvatar = result[0].get('avatarURL');
                                                $rootScope.$broadcast('user_registration');
                                              
                                            });
                                        }
                                    });

                                    //redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER;
                                    redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER_ADDUSER;
                                } else {
                              
                                    authService.createAuthSms($rootScope.userPName);
                                    $rootScope.editInfo = false ;
                                    redirectPage = CONSTANTS.ROUTES.AUTH_SMS;
                                }

                                $scope.safeApply(function () {
                                    $scope.section.loginInProgress = false;
                                    $location.path(redirectPage);

                                });
                            });*/
                        }
                    });
                });
            }

        });

        $scope.clearData();
    };
    
    $scope.placeUserMsgBack = function(){
        $rootScope.placeUserMsg = false ;
    }

    //Authenticate user according to there code
    $scope.smsLogin = function() {
        //TODO: should old auth entries deleted when requested for the new one for the same phone?
        //User clicked on SMS auth

        $rootScope.userAvatar = '' ;
//        $scope.safeApply(function(){
            $scope.section.loginInProgress = true;
//        });

        authService.newUserChk($rootScope.userPName, function(user) {
            
            if (user.length > 0) {
                //not a new user
                $scope.newUser = false;
            }else{
                $scope.newUser = true;
            }
        
        })

        authService.authenticateSms($scope.user.sms, function (rUser) {
            var redirectPage;
            if (rUser) {
              

                if (rUser.get("authData")) {
                 
                    redirectPage = CONSTANTS.ROUTES.KIOSK_USERPROFILE;
                } else {
                

                    if($scope.newUser == true){
                        if($rootScope.pageUserFlag == true){
                            redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER_ADDUSER;
                            $scope.loginRedirect(redirectPage);
                        }else{
                            redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER;
                            $scope.loginRedirect(redirectPage);
                        }
                    }else{
                        userService.getUserChannelInfo($rootScope.userPName, function(result){
                          

                            if (result.length > 0){
                              

                                $rootScope.infoUserChannal.channel = result[0].get('channel') ;
                                $rootScope.infoUserChannal.fullNmae = result[0].get('fullName') ;
                                $rootScope.infoUserChannal.userId = result[0].get('userId') ;
                                $rootScope.infoUserChannal.avatarURL = result[0].get('avatarURL') ;
                                $rootScope.infoUserChannal.email = result[0].get('email') ;
                                $rootScope.infoUserChannal.vocation = result[0].get('vocation') ;

                                $rootScope.editInfo = true ;
                                $rootScope.userAvatar = result[0].get('avatarURL');
                                //$rootScope.$broadcast('user_registration');

                                if($rootScope.pageUserFlag == true){
                                    redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER_ADDUSER;
                                    $scope.loginRedirect(redirectPage);
                                }else{
                                    //redirectPage = CONSTANTS.ROUTES.KIOSK_USERPROFILE;
                                    redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER;
                                    $scope.loginRedirect(redirectPage);
                                }


                            }else{
                                if($rootScope.pageUserFlag == true){
                                    redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER_ADDUSER;
                                    $scope.loginRedirect(redirectPage);
                                }else{
                                    redirectPage = CONSTANTS.ROUTES.KIOSK_REGISTER;
                                    $scope.loginRedirect(redirectPage);
                                }
                            }
                        });
                    }


                }
            }
            else {
                    $scope.safeApply(function () {
                        $rootScope.errorMsg = true ;
                        $scope.section.loginInProgress = false;
                    });
            }

            /*$scope.safeApply(function () {
              
                $location.path(redirectPage)
            });*/
        });
        $scope.user.sms = null;
    }
    
    $scope.errorMsgClose = function(){
        $rootScope.errorMsg = false ;
    }
    
    $scope.backLogin = function() {
        $scope.safeApply(function () {
            $scope.errorMsgClose();
            $scope.loginRedirect(CONSTANTS.ROUTES.AUTH);
        });
    }
    
    $scope.loginRedirect = function(redirectPage) {
        $scope.safeApply(function () {
         
            $scope.section.loginInProgress = false;
            $location.path(redirectPage);
        });
    }
    
    $scope.closeMsgBox = function() {
        $rootScope.placeUserMsg = false ;
        $scope.section.loginInProgress = false ;
    }

    $scope.launchKioskPhone = function (){

        $rootScope.placeSearchResults = [];

        if($scope.user.phone == null || $scope.user.phone == ''){
          
            $rootScope.placeUserMsg = true ;
        } else {
            userService.getUserChannelByChannel($scope.user.phone , function(userChannelInfo) {
          
                var userID = userChannelInfo.get("userId");
                sweetService.getPlacesInfoByPhone(userID, function (placeInfo) {
                   
                    $rootScope.placeSearchResults.LatLong = placeInfo[0].get("LatLong");
                    $rootScope.placeSearchResults.gname = placeInfo[0].get("gname");
                    $rootScope.placeSearchResults.placeSweetName = placeInfo[0].get("placeSweetName");
                    $rootScope.placeSearchResults.placeName = placeInfo[0].get("placeName");
                    $rootScope.placeSearchResults.icon = placeInfo[0].get("icon");
                    $rootScope.placeSearchResults.formatted_address = placeInfo[0].get("address");
                    $rootScope.placeSearchResults.kioskthankyoutitle = placeInfo[0].get("placeTitle") ;
                
                    $scope.safeApply(function () {
                        $rootScope.editInfo = false ;
                        $location.path($rootScope.placeSearchResults.placeName);
                    });
                 });
            });
        }
    }

    $scope.joinKioskPlace = function(){
       
        //$scope.joinKioskPlace = true ;
        //$location.path(CONSTANTS.ROUTES.AUTH_JOIN);
        $location.path('u/auth/join');
    }
    
    $scope.loginPage = function(){
       
        $location.path('u/auth/loginpage');
    }

    $scope.launchPage = function(){
      
        $location.path('u/auth/launch');
    }
    
    
    //phonegap login
    //var authData,id,access_token,expiration_date;

    /*$scope.phonegapFBLogin = function() {
    

            /*if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')){ alert('Cordova variable does not exist. Check that you have included cordova.js correctly')};
            if (typeof CDV == 'undefined') {alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly')};
            if (typeof FB == 'undefined') {alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.')};

            //FB.login(function (response) {
                //if (response.status === 'connected') {
                    //alert("Connected");

             Parse.FacebookUtils.logIn("email,publish_actions",{
                 success: function (_user) {
                        //alert("Logged In");
                if (!_user.existed()) {
                    alert("User signed up and logged in through Facebook!");
                            } else {
                    alert("User logged in through Facebook!");
                            }
                            facebookService.getExtendedToken(function (success) {
                    alert("---Extended Token--- " + success);
                            });
//                    cb(user);

                          

                /*facebookService.updateUserInfo(_user, function (rUser, rUserChannel) {
                                $scope.safeApply(function () {
                                    $scope.section.loginInProgress = false;
                                    if (rUserChannel)
                                        $rootScope.loadUserChannel();
                                    //$location.path(CONSTANTS.ROUTES.SWEET_HOME);
                                });
                            });

                            // Get user places
                sweetService.getUserPlaces(_user.get("authData")["facebook"]["id"], function (placeUserSweets) {
                    alert("Successfully retrieved placeUserSweets " + placeUserSweets.length + " scores.");
                                $scope.safeApply(function () {
                                    $rootScope.listPlaces = placeUserSweets;
                        alert("Successfully retrieved listPlaces " + $rootScope.listPlaces.length + " scores.");
                                    $location.path(CONSTANTS.ROUTES.SWEET_HOME_PLACE);
                                });
                            });

                        },
            error:function (_user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
                alert(error.message);
//                    cb(null);
                        }
                    });
                    
                //};
              document.getElementById('data').innerHTML = JSON.stringify(response);  
           //},{ scope: "email,publish_actions" });
            
            // Additional init code here
           *//* FB.login(function (response) {
                if (response.status === 'connected') {
                    alert("Connected");
                    id = response.authResponse.userID;
                    access_token = response.authResponse.accessToken;
                    expiration_date = new Date();
                    expiration_date.setSeconds(expiration_date.getSeconds() + response.authResponse.expiresIn);
                    expiration_date = expiration_date.toISOString();
                    authData = {
                            "id" : id,
                            "access_token" : access_token,
                            "expiration_date" : expiration_date
                    };
                     
                } else if (response.status === 'not_authorized') {
                    // not_authorized
                    alert('not_authorized');
                } else {
                    // not_logged_in
                    alert('not_logged_in');
                }
                $scope.parseAuth();
                document.getElementById('data').innerHTML = JSON.stringify(response);
            },{ scope: "email,publish_actions" });*//*

            
        };*/


//    $scope.section.loginInProgress = false;
    /*$scope.facebookLogin = function () {

        $log.info("--Facebook Login---");
        $scope.safeApply(function () {
            $scope.section.loginInProgress = true;
            $scope.section.loginInProgressMsg = CONSTANTS.LOGIN_IN_PROGRESS;
        });

        Parse.FacebookUtils.logIn("publish_actions,email", {
            success:function (user) {
                if (!user.existed()) {
                  
                } else {
                    
                }
                facebookService.getExtendedToken(function (success) {
                    
                });
//                    cb(user);

              

                facebookService.updateUserInfo(user, function (rUser, rUserChannel) {
                    $scope.safeApply(function () {
                        $scope.section.loginInProgress = false;
                        if (rUserChannel)
                            $rootScope.loadUserChannel();
                        //$location.path(CONSTANTS.ROUTES.SWEET_HOME);
                    });
                });

                // Get user places
                sweetService.getUserPlaces(user.get("authData")["facebook"]["id"], function (placeUserSweets) {
                  
                    $scope.safeApply(function () {
                        $rootScope.listPlaces = placeUserSweets;
                     
                        $location.path(CONSTANTS.ROUTES.SWEET_HOME_PLACE);
                    });
                });

            },
            error:function (user, error) {
               
//                    cb(null);
            }
        });

//        $log.info("--Facebook Login---");
//        $scope.safeApply(function() {
//            $scope.section.loginInProgress = true;
//            $scope.section.loginInProgressMsg = CONSTANTS.LOGIN_IN_PROGRESS;
//        });
//        facebookService.doLogin(function(rUser, rUserChannel) {
//            $scope.safeApply(function() {
//                $scope.section.loginInProgress = false;
//                if(rUserChannel)
//                    $rootScope.loadUserChannel();
//                $location.path(CONSTANTS.ROUTES.SWEET_HOME);
//            });
//        });
    */

    /*$scope.facebookLink = function () {
//        $log.info("--Facebook Link---");
//        facebookService.doLink(function(rUser, rUserChannel) {
//            $scope.safeApply(function() {
//                if(rUserChannel)
//                    $rootScope.loadUserChannel();
//                $location.path(CONSTANTS.ROUTES.SWEET_HOME);
//            });
//        });

        var user = userService.currentUser();
        if (!Parse.FacebookUtils.isLinked(user)) {
            Parse.FacebookUtils.link(user, CONSTANTS.SOCIAL.FACEBOOK.PERMISSIONS, {
                success:function (rUser) {
                
                    facebookService.getExtendedToken(function (success) {
                       
                    });
//                    cb(user);

                    facebookService.updateUserInfo(rUser, function (rUser, rUserChannel) {
                        $scope.safeApply(function () {
                            $scope.section.loginInProgress = false;
                            if (rUserChannel)
                                $rootScope.loadUserChannel();
                            $location.path(CONSTANTS.ROUTES.SWEET_HOME);
                        });
                    });
//                    cb(rUser);
                },
                error:function (user, error) {
                 
//                    cb(null);
                }
            });
        } else {
            facebookService.updateUserInfo(user, function (rUser, rUserChannel) {
                $scope.safeApply(function () {
                    $scope.section.loginInProgress = false;
                    if (rUserChannel)
                        $rootScope.loadUserChannel();
                    $location.path(CONSTANTS.ROUTES.SWEET_HOME);
                });
            });

//            cb(user);
        }

    };*/

    /*$scope.facebookUnLink = function () {
        //var user = userService.currentUser();
       
        Parse.User.logOut();
        window.location = "#/";
        window.location.reload();
        //$location.path(CONSTANTS.ROUTES.AUTH);
        //$location.path("/auth");
        *//*if (Parse.FacebookUtils.isLinked(user)) {
         Parse.FacebookUtils.unlink(user);
         }*//*
    };*/

    /*$scope.facebookPlaceLogin = function () {

        $log.info("--Facebook Place Login---");
       

        $scope.safeApply(function () {
            $scope.section.loginInProgress = true;
            $scope.section.loginInProgressMsg = CONSTANTS.LOGIN_IN_PROGRESS;
        });

        Parse.FacebookUtils.logIn("publish_actions,email", {
            success:function (user) {
                if (!user.existed()) {
                 
                } else {
                  
                }
                facebookService.getExtendedToken(function (success) {
                });

                facebookService.updateUserInfo(user, function (rUser, rUserChannel) {

                    $scope.addsweetplace =[];

                    $scope.safeApply(function () {
                      

                        $scope.addsweetplace.LatLong = $rootScope.currentPlace[0].get('LatLong');
                        $scope.addsweetplace.gname = $rootScope.currentPlace[0].get('gname');
                        $scope.addsweetplace.icon = $rootScope.currentPlace[0].get('icon');
                        $scope.addsweetplace.joinReq = '1';
                        $scope.addsweetplace.userPic = 'http://graph.facebook.com/'+ user.get("authData")["facebook"]["id"] + '/picture';
                        $scope.addsweetplace.userNetwork = '';
                        $scope.addsweetplace.userName = rUserChannel.get("fullName");
                        $scope.addsweetplace.userID = user.get("authData")["facebook"]["id"];
                        $scope.addsweetplace.placeLatitude = $rootScope.currentPlace[0].get('placeLatitude');
                        $scope.addsweetplace.placeLongitude = $rootScope.currentPlace[0].get('placeLongitude');
                        $scope.addsweetplace.placeURL = $rootScope.currentPlace[0].get('placeURL');
                        $scope.addsweetplace.placeDesc = $rootScope.currentPlace[0].get('placeDesc');
                        $scope.addsweetplace.placeSweetName = $rootScope.currentPlace[0].get('placeSweetName') ;
                        $scope.addsweetplace.placeName = $rootScope.currentPlace[0].get('placeName') ;
                        $scope.addsweetplace.placeCreatorId = $rootScope.currentPlace[0].get('placeCreatorId') ;
                        $scope.addsweetplace.placeTitle = $rootScope.currentPlace[0].get('placeTitle') ;

                        sweetService.checkUserPlaces(user.get("authData")["facebook"]["id"],$rootScope.currentPlace[0].get('placeName'), function (results) {
                           if (results.length > 0){
                              
                           } else {
                               sweetService.addSweetPlaceParse($scope.addsweetplace, function () {
                                   //$scope.facebookUnLink();
                               });

                           }

                           $scope.facebookUnLink();
                        });

                        *//*sweetService.addSweetPlaceParse($scope.addsweetplace, function () {
                            $scope.facebookUnLink();
                        });*//*

                        $scope.section.loginInProgress = false;
                        //if (rUserChannel)
                            //$rootScope.loadUserChannel();
                      
                        $location.path('/'+ $rootScope.publicName);
                    });
                });

            },
            error:function (user, error) {
              
//                    cb(null);
            }
        });

//        $log.info("--Facebook Login---");
//        $scope.safeApply(function() {
//            $scope.section.loginInProgress = true;
//            $scope.section.loginInProgressMsg = CONSTANTS.LOGIN_IN_PROGRESS;
//        });
//        facebookService.doLogin(function(rUser, rUserChannel) {
//            $scope.safeApply(function() {
//                $scope.section.loginInProgress = false;
//                if(rUserChannel)
//                    $rootScope.loadUserChannel();
//                $location.path(CONSTANTS.ROUTES.SWEET_HOME);
//            });
//        });
    };*/
}

/*function HelpCtrl($scope, authService, $location, CONSTANTS, helpService) {
    $scope.help = {};

    $scope.helpMe = function () {
        helpService.submit($scope.loggedInUser.get('fullName')
            , $scope.loggedInUser.get('username')
            , $scope.help.text, function () {
                $scope.help.text = "";
                $scope.safeApply($location.path("/help/sent"));
            });
    };

}*/

/*function ContactCtrl($scope, contactService, userService, $rootScope, $location) {
    $scope.source = [];
    $scope.emails = {};
    contactService.getContacts(function (response) {
            if (response) {
                $scope.safeApply(function () {
                    $scope.gmailUserContacts = response.get("gmail");
                    $scope.yahooUserContacts = response.get("yahoo");
                    var allcontacts = $scope.gmailUserContacts.concat($scope.yahooUserContacts);
                    for (var i = 0; i < allcontacts.length; i++) {
                        if (allcontacts[i] != null) {
                            $scope.source.push(allcontacts[i].name);
                            $scope.emails[allcontacts[i].name] = allcontacts[i].email;

                        }
                    }
                });
            }
        }
    );
}*/

/*function UserCtrl($log, $scope, sweetService, interactionService, authService, userService, $location, utilService, $rootScope, CONSTANTS) {
    $scope.showPreference = function () {
        $location.path("#/user/preference");
    };
}*/

function AdminCtrl($log, $scope, sweetService, userService, adminService, CONSTANTS) {

    //$scope.bulkSweet = {};
    //$scope.bulkSweet.text = CONSTANTS.DEFAULT_GESTURE_TEXT;

    /*$scope.createBulkGestures = function () {
        $scope.bulkSweet["senderId"] = userService.currentUser().id;
        $scope.bulkSweet["senderName"] = $scope.loggedInUser.get('fullName');
        $scope.bulkSweet["senderPhone"] = $scope.loggedInUser.get('username');

        $scope.bulkSweet["gestureType"] = CONSTANTS.DEFAULT_GESTURE_TYPE;
        //            pSweet.set("picture", sweet.picture.url);
        $scope.bulkSweet["star"] = true;
        $scope.bulkSweet["heart"] = false;
        $scope.bulkSweet["text"] = $scope.bulkSweet.text;
        $scope.bulkSweet["greetingBackground"] = CONSTANTS.DEFAULT_GREETING_BACKGROUND;
        $scope.bulkSweet["fontColor"] = CONSTANTS.DEFAULT_FONT_COLOR;

        adminService.createBulkGestures($scope.bulkSweet, function (success) {
            if (success) {
                $scope.bulkCreationStatus = CONSTANTS.BULK_EMAIL.SENT_MSG;
            }
        });
    };*/
}

//==================================================================================================
//  Define new controller for place pages
//alpha
//==================================================================================================
function SweetCtrlPlace($window, UpdateService, $log, $scope, sweetService, interactionService, authService,
                        userService, $location, utilService, $rootScope, CONSTANTS, socialNetworksService, facebookService, $route,
                        $routeParams)
{

  
    var renderAction = $location.path();
    //var renderAction = $route.current.action;

    var renderPath = renderAction.split("/");
    //var renderPath = renderAction.split( "." );

    var username = ($routeParams.name || "");

    if (username == "" && username != '[object Object]') {
        username = $rootScope.publicName;
    }

    if (renderPath[1] != '' && renderPath[1] != 'custom' && renderPath[1] != '[object Object]') {
        username = renderPath[1];
        $rootScope.publicName = renderPath[1];
    }

   

    // Store the values in the model.
    $scope.sweetName = username;


    $scope.isUserLoggedIn = true;
    $scope.showLogin = false;
    $scope.currentPage = 0;
    $scope.sweet = {};
    $scope.userSweets = [];
    $scope.newSweet = {};
    $scope.sweets = [];
    $scope.pageSize = CONSTANTS.DEFAULT_AVATAR_PAGINATION_SIZE;
    $scope.guestPlace = {};
    $rootScope.currentPlace = [];

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
      
        if ((( ($scope.currentPage + 1) * $scope.pageSize) < $scope.friends.length - 1) && $scope.pageSize != $scope.friends.length) {
            $scope.currentPage++;
        }
    };

    $scope.$watch($rootScope.publicName, function () {
    

        /*sweetService.getPlacesSweets($rootScope.publicName, function (placeSweets) {
       
            $scope.safeApply(function () {
                $rootScope.placeSweets = placeSweets;
            });
        });*/
        sweetService.placesUsersDeleteCloud( function(result) {
       
         });
         
        sweetService.misChannelDel( function(result) {
       
        });
         
        sweetService.getPlacesInfo($rootScope.publicName, function (placeInfo) {
           
            
            sweetService.getPlaceOwnerEmail(placeInfo[0].get('placeCreatorId'), function(result){
               
                $rootScope.owneremail = result.get('email') ;
            });
            
            $scope.safeApply(function () {
                $rootScope.currentPlace = placeInfo;
                $scope.gustPageInfo = true;
            });
        });

        /*sweetService.getPlacestoJoin(username ,$scope.friend.id, function(placeDetailSweets) {
       
         if (placeDetailSweets.length == 0){
         $rootScope.placeJoin = true;
         } else {
         $rootScope.placeJoin = false;
         }
         });*/

        sweetService.getPlacesDetail($rootScope.publicName, function (placeDetailSweets) {
          
            $scope.safeApply(function () {
                $rootScope.usersInPlaces = placeDetailSweets;
            });
        });

        $scope.guestPlace.placeName = username;
    }, true);

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
     
        if ((( ($scope.currentPage + 1) * $scope.pageSize) < $scope.friends.length - 1) && $scope.pageSize != $scope.friends.length) {
            $scope.currentPage++;
        }
    };


    $scope.sendPlaceGesture = function (uplace) {
             
        $scope.setLastVisitedPage();

        $scope.placeInfo = [];
        $scope.placeInfo = uplace;
        $scope.magicButtonImage = uplace.get('userPic');
      

        $scope.section.sending = true;
        $scope.showPlaceGestureSendActionsPlace = true;
        $location.path("/partials/sent");

        $scope.section.sendingPlace = true;
    }


    $scope.cancelSweetPlace = function (place) {
      
        $location.path('/' + place.get("placeName"));
    };

    $scope.sendSweetnessPlaceGesture = function (placeInfo, sweetId) {
        //$scope.showmobileActions = false;
        
        $scope.section.sending = true;
        $scope.safeApply(function () {
            $rootScope.thanksheading2 = false;
        });
        
        //if(sweetId) $scope.newSweet.replyToSweet = sweetId;
        $scope.newSweet.receiverPhone = placeInfo.get("userID");
        $scope.newSweet.receiverName = placeInfo.get("userName");
        $scope.newSweet.receiverChannel = placeInfo.get("userNetwork");
        $scope.newSweet.receiverPicture = placeInfo.get("userPic");
        $scope.newSweet.placename = placeInfo.get("placeName");
        $scope.newSweet.placesweetname = placeInfo.get("placeName");


        $scope.newSweet.senderId = "miscellaneous";
        $scope.newSweet.senderName = "SweetCustomer";
        $scope.newSweet.senderPhone = "miscellaneous";
        $scope.newSweet.senderChannel = "miscellaneous";
        $scope.newSweet.senderPicture = "img/thanx.png";

        //if user not login
        if (userService.currentUser() == null) {
            $scope.newSweet.currentUser = "SweetCustomer";
            $scope.newSweet.gesture = CONSTANTS.GESTURES[0].sub_actions[3];
        } else {
            $scope.newSweet.gesture = CONSTANTS.GESTURES[0].sub_actions[2];
        }

      
        $scope.newSweet.text = "Thank You, all of you";

        sweetService.saveSweet($scope.newSweet, function (rSweet, rUserSweet) {
            $scope.safeApply(function () {
                $scope.sweets.push(rSweet);
                $scope.sweets.sortByProp("updatedAt");
            });

            $scope.safeApply(function () {
                facebookService.postToWall(rSweet, $scope.newSweet.gesture.facebook_template, function (success) {
                    //$scope.$parent.updateLoginInfo();
                    $scope.squeezed = false;

                    setTimeout(function () {
                        $scope.section.sending = false;
                        $scope.safeApply();
                    }, 4000);

                });
            });
            //$location.path("/location/sweetplace");
        });


        sweetService.saveSweetofPlace($scope.newSweet, function () {
            /*$scope.safeApply(function() {
             $scope.sweets.push(rSweet);
             $scope.sweets.sortByProp("updatedAt");
             });*/
        });

        /*sweetService.saveSweetPlace($scope.newSweet, function(rSweet,rUserSweet) {
         $scope.safeApply(function() {
         $scope.sweets.push(rSweet);
         $scope.sweets.sortByProp("updatedAt");
         });
         });*/

        //$location.path('/' + placeInfo.get("placeName") );

        $scope.refrest(placeInfo.get("placeName"));
        $scope.showPlaceGestureSendActionsPlace = false;
        $scope.section.sendingPlace = false;
    };

    $scope.refrest = function (placename) {
        $location.path('/' + placename);
    }

    $scope.setMe = function () {
        var timeout = 2000;
        if (userService.currentUser() && userService.currentUser().get("authData")["facebook"]["id"])
            timeout = 0;

        setTimeout(function () {
            $scope.safeApply(function () {
                $scope.friend = {};
                $scope.friend.id = userService.currentUser().get("authData")["facebook"]["id"];

                $scope.friend.name = $rootScope.userChannel.get("fullName");
                $scope.friend.network = "facebook";

                $scope.friend.picture = {};
                $scope.friend.picture['data'] = {};
                $scope.friend.picture['data']['url'] = $scope.newSweet.senderPicture;

                $scope.magicButtonImage = $scope.newSweet.senderPicture;
            });
        }, timeout);

    };

    $scope.user = {
        fullName:null,
        phone:null
    };

    $scope.clearData = function () {
        $scope.user = {
            fullName:null,
            phone:null
        };
    };

    /*$scope.newAuthLocation = function () {

        authService.createAuth($scope.user.phone, $scope.user.fullName || "NoName");
        $scope.clearData();
//        TODO: add callback
        $scope.showmobileActions = false;
        $location.path('/location/sweetplace');

    };

    $scope.newAuthLocationCancel = function () {
        $scope.showmobileActions = false;
        $location.path('/location/sweetplace');
    };*/
}

function CameraCtrl($window, UpdateService, $log, $scope, sweetService, interactionService, authService,
                        userService, $location, utilService, $rootScope, CONSTANTS, socialNetworksService, facebookService, $route,
                        $routeParams) {

    //open camera 

    var imageData,pic_url;
    //Profile Picture
    $scope.capturePhoto = function() {
        $rootScope.loginInProgress_profile = true;
        //alert("Login Progress: " + $scope.section.loginInProgress);
        var options =   {
            quality: 100,
            cameraDirection:1,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            correctOrientation: true,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            allowEdit: true
        };
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onSuccess,onFail,options);
        //$rootScope.$broadcast("feedbackImg_profile");
        
    };
    var onSuccess = function(data3) {
        
            var thumbnail = 400;
            var ppWidth, ppHeight;
            var data;
            data = "data:image/jpeg;base64," + data3;
            
            //alert("Image: " + data);
            var image = new Image();
            image.src = data;
            
            var canvas = document.createElement('canvas');
            
            canvas.width = thumbnail;
            canvas.height = thumbnail;
            
            
            image.onload = function(){
                ppWidth = image.width;
                ppHeight = image.height;

                //alert('Width: ' + ppWidth);
                //alert('Height: ' + ppHeight);

                var context = canvas.getContext('2d');
                context.clearRect(0, 0, thumbnail, thumbnail);
                var imageWidth;
                var imageHeight;
                var offsetX = 0;
                var offsetY = 0;



                if (image.width > image.height) {
                    imageWidth = Math.round(thumbnail * image.width / image.height);
                    imageHeight = thumbnail;
                    offsetX = - Math.round((imageWidth - thumbnail) / 2);
                    //alert("IF");
                } else {
                    imageHeight = Math.round(thumbnail * image.height / image.width);
                    imageWidth = thumbnail;    
                    offsetY = - Math.round((imageHeight - thumbnail) / 2);            
                    //alert("ELSE");
                }

                context.drawImage(image, offsetX, offsetY, imageWidth, imageHeight);
                //alert("Image Drawn");
                //}
                var data2 = canvas.toDataURL('image/jpeg');

                //alert ("Data2.1: " + data2);
                data2 = data2.replace(/^data:image\/(png|jpeg);base64,/, "");
                //alert ("Data2.2: " + data2);

                //alert("Source Set!");

                var parseAPPID = "20ikCRtemutosNIL2WiJRWay3IK1XN5VAhZMnOSs";
                var parseJSID = "jNVQ6ZWFnMMhS8JG2V3kqkZJ2HOoarclFpOh5g1C";

                //Initialize Parse
                Parse.initialize(parseAPPID,parseJSID);

                var parseFile = new Parse.File("mypic.jpg", {base64:data3});

                parseFile.save().then(function() {
                                                    //alert("Got it!");
                                                    $rootScope.userAvatar = parseFile.url();
                                                    pic_url = parseFile.url();
                                                    uploadParse(pic_url);
                                                    
                                                    $rootScope.$broadcast("load_user_channel");
                                                    $rootScope.$broadcast("feedbackImg_uploaded");
                                                    $rootScope.$broadcast("feedbackImg_profile");
                                                    //alert (parseFile.url());
                                                   

                                                }, function(error) {
                                                   
                                                });
            }
    };
       
    var onFail = function(e) {
        $scope.safeApply(function () {
        $rootScope.loginInProgress_profile = false;
        });
        //alert("On fail " + e);
        //alert("Profile Picture Progress: " + $rootScope.loginInProgress_profile);
        $rootScope.$broadcast("feedbackImg_profile");
    };
    
    var uploadParse = function(url){
        var query = new Parse.Query("User");
        
                            //query.equalTo("userId", scope.userid);
                            //alert('Upload Parse Called');
                            query.equalTo("username", $rootScope.userPName );
                            //alert("SweetofPlaceID: " + $rootScope.sweetofplaceid);
                            //alert("---sweetfleseelect---- userId"+$scope.userid);
                            query.first({
                                success:function(rUserChannel) {
                                  
                                    rUserChannel.set("avatarUrl",url);
                                    rUserChannel.save(null,{
                                        success:function(sUserChannel) {
                                            //alert("Saved "+sUserChannel);
                                            $scope.$apply(function() {
                                               
                                                //$rootScope.userAvatar = sUserChannel.get("avatarURL");
                                                userService.setUserChannel(sUserChannel);
                                                //$rootScope.$broadcast("load_user_channel");
                                                //$rootScope.$broadcast("feedbackImg_uploaded");
                                                // scope.setuseravatar(data.url);
                                            });
                                        }
                                    });
                                }
                            });
        var query2 = new Parse.Query("UserChannel");
        query2.equalTo("channel", $rootScope.userPName); 
        query2.first({
            success:function(rUserChannel) {
                                  
                                    rUserChannel.set("avatarUrl",url);
                                    rUserChannel.set("avatarURL",url);
                                    rUserChannel.save(null,{
                                        success:function(sUserChannel) {
                                            //alert("Saved "+sUserChannel);
                                            $scope.$apply(function() {
                                              
                                                
                                            });
                                        }
                                    });
                                }
                            });
        
    }
    
    $scope.capturePhotoCust = function() {
        $rootScope.showprogress = true;
      
        $rootScope.$broadcast("feedbackImg_upload");
        
        var options =   {
            quality: 50,
            cameraDirection:1,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            correctOrientation: true,
            destinationType: navigator.camera.DestinationType.DATA_URL
            //saveToPhotoAlbum: true
        };
        // Take picture using device camera and retrieve image as base64-encoded string
        
        navigator.camera.getPicture(onSuccessCust,onFailCust,options);
    };
    
    var onSuccessCust = function(data3) {
            //$rootScope.showprogress = true;
            var thumbnail = 400;
            var ppWidth, ppHeight;
            var data;
            data = "data:image/jpeg;base64," + data3;
            
            
            var image = new Image();
            image.src = data;
            
            var canvas = document.createElement('canvas');
            
            canvas.width = thumbnail;
            canvas.height = thumbnail;
            
            
            image.onload = function(){
                ppWidth = image.width;
                ppHeight = image.height;

                //alert('Width: ' + ppWidth);
                //alert('Height: ' + ppHeight);

                var context = canvas.getContext('2d');
                context.clearRect(0, 0, thumbnail, thumbnail);
                var imageWidth;
                var imageHeight;
                var offsetX = 0;
                var offsetY = 0;



                if (image.width > image.height) {
                    imageWidth = Math.round(thumbnail * image.width / image.height);
                    imageHeight = thumbnail;
                    offsetX = - Math.round((imageWidth - thumbnail) / 2);
                    //alert("IF");
                } else {
                    imageHeight = Math.round(thumbnail * image.height / image.width);
                    imageWidth = thumbnail;    
                    offsetY = - Math.round((imageHeight - thumbnail) / 2);            
                    //alert("ELSE");
                }

                context.drawImage(image, offsetX, offsetY, imageWidth, imageHeight);
                //alert("Image Drawn");
                //}
                var data2 = canvas.toDataURL('image/jpeg');

                //alert ("Data2.1: " + data2);
                data2 = data2.replace(/^data:image\/(png|jpeg);base64,/, "");
                //alert ("Data2.2: " + data2);

                //alert("Source Set!");

                var parseAPPID = "20ikCRtemutosNIL2WiJRWay3IK1XN5VAhZMnOSs";
                var parseJSID = "jNVQ6ZWFnMMhS8JG2V3kqkZJ2HOoarclFpOh5g1C";

                //Initialize Parse
                Parse.initialize(parseAPPID,parseJSID);

                var parseFile = new Parse.File("mypic.jpg", {base64:data3});

                parseFile.save().then(function() {
                                                    //alert("Got it!");
                                                    $rootScope.visitorAvatar = parseFile.url();
                                                    pic_url = parseFile.url();
                                                    uploadParseCust(pic_url);
                                                    $rootScope.showprogress = false;
                                                    $rootScope.thanksheading2 = true;
                                                    $rootScope.$broadcast("load_user_channel");
                                                    $rootScope.$broadcast("feedbackImg_uploaded");
                                                    //alert (parseFile.url());
                                                  

                                                }, function(error) {
                                                  
                                                });
            }
            
    };
       
    var onFailCust = function(e) {
       
        $rootScope.$broadcast("feedbackImg_uploaded");
        $rootScope.showprogress = false;
        $rootScope.thanksheading2 = false;
    };
    
    var uploadParseCust = function(url){
        var query = new Parse.Query("PlaceSweetness");
        
                            //query.equalTo("userId", scope.userid);
                            //alert('Upload Parse Called');
                            query.equalTo("objectId", $rootScope.sweetofplaceid );
                            //alert("SweetofPlaceID: " + $rootScope.sweetofplaceid);
                            //alert("---sweetfleseelect---- userId"+$scope.userid);
                            query.first({
                                success:function(rUserChannel) {
                                   
                                    rUserChannel.set("receiverPicture",url);
                                    rUserChannel.save(null,{
                                        success:function(sUserChannel) {
                                            //alert("Saved "+sUserChannel);
                                            $scope.$apply(function() {
                                              
                                                //$rootScope.userAvatar = sUserChannel.get("avatarURL");
                                                userService.setUserChannel(sUserChannel);
                                                //$rootScope.$broadcast("load_user_channel");
                                                //$rootScope.$broadcast("feedbackImg_uploaded");
                                                // scope.setuseravatar(data.url);
                                            });
                                        }
                                    });
                                }
                            });
        
        
    }
    
    
    //Capture Place Picture
    
     $scope.capturePlacePhoto = function(){
        var options =   {
            quality: 100,
            cameraDirection:0,
            sourceType: 1,     // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            correctOrientation: true,
            //allowEdit: true,
            destinationType: navigator.camera.DestinationType.DATA_URL
            //saveToPhotoAlbum: true
        };
        // Take picture using device camera and retrieve image as base64-encoded string
        $scope.showprogress = true;
        navigator.camera.getPicture(onSuccessPlace,onFailPlace,options);
    }
    
    
    var onSuccessPlace = function(data3) {
        
            var thumbnailwidth = 768;
            var thumbnailheight = 304;
            var ppWidth, ppHeight;
            var data;
            data = "data:image/jpeg;base64," + data3;
            
            //alert("Image: " + data);
            var image = new Image();
            image.src = data;
            
            var canvas = document.createElement('canvas');
            
            canvas.width = thumbnailwidth;
            canvas.height = thumbnailheight;
            
            
            image.onload = function(){
                ppWidth = image.width;
                ppHeight = image.height;

                //alert('Width: ' + ppWidth);
                //alert('Height: ' + ppHeight);

                var context = canvas.getContext('2d');
                context.clearRect(0, 0, thumbnailwidth, thumbnailheight);
                var imageWidth;
                var imageHeight;
                var offsetX = 0;
                var offsetY = 0;



                if (image.width > image.height) {
                    imageWidth = Math.round(thumbnailwidth * image.width / image.height);
                    imageHeight = thumbnailheight;
                    offsetX = - Math.round((imageWidth - thumbnailwidth) / 2);
                    //alert("IF");
                } else {
                    imageHeight = Math.round(thumbnailheight * image.height / image.width);
                    imageWidth = thumbnailwidth;    
                    offsetY = - Math.round((imageHeight - thumbnailheight) / 2);            
                    //alert("ELSE");
                }

                context.drawImage(image, offsetX, offsetY, imageWidth, imageHeight);
                //alert("Image Drawn");
                //}
                var data2 = canvas.toDataURL('image/jpeg');

                //alert ("Data2.1: " + data2);
                data2 = data2.replace(/^data:image\/(png|jpeg);base64,/, "");
                //alert ("Data2.2: " + data2);

                //alert("Source Set!");

                var parseAPPID = "20ikCRtemutosNIL2WiJRWay3IK1XN5VAhZMnOSs";
                var parseJSID = "jNVQ6ZWFnMMhS8JG2V3kqkZJ2HOoarclFpOh5g1C";

                //Initialize Parse
                Parse.initialize(parseAPPID,parseJSID);

                var parseFile = new Parse.File("mypic.jpg", {base64:data3});

                parseFile.save().then(function() {
                                                    //alert("Got it!");
                                                    $rootScope.placeAvatar = parseFile.url();
                                                    pic_url = parseFile.url();
                                                    uploadParsePlace(pic_url);
                                                    $rootScope.$broadcast("load_user_channel");
                                                    $rootScope.$broadcast("feedbackImg_uploaded");
                                                    $scope.showprogress = false;
                                                    //alert (parseFile.url());
                                                   

                                                }, function(error) {
                                                   
                                                });
            }
    };
       
    var onFailPlace = function(e) {
      
        $scope.showprogress = false;
    };
    
    var uploadParsePlace = function(url){
        var query = new Parse.Query("SweetPlace");
        
                            //query.equalTo("userId", scope.userid);
                            //alert('Upload Parse Called');
                            query.equalTo("objectId", $rootScope.newplaceid );
                            //alert("SweetofPlaceID: " + $rootScope.sweetofplaceid);
                            //alert("---sweetfleseelect---- userId"+$scope.userid);
                            query.first({
                                success:function(rUserChannel) {
                                   
                                    rUserChannel.set("placePhoto",url);
                                    rUserChannel.save(null,{
                                        success:function(sUserChannel) {
                                            //alert("Saved "+sUserChannel);
                                            $scope.$apply(function() {
                                              
                                                //$rootScope.userAvatar = sUserChannel.get("avatarURL");
                                                userService.setUserChannel(sUserChannel);
                                                //$rootScope.$broadcast("load_user_channel");
                                                //$rootScope.$broadcast("feedbackImg_uploaded");
                                                // scope.setuseravatar(data.url);
                                            });
                                        }
                                    });
                                }
                            });
        
    }
    
    
}
                        