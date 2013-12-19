function CalendarController($window, UpdateService, $log, $scope, sweetService, interactionService, authService,
                        userService, $location, utilService, $rootScope, CONSTANTS, socialNetworksService, facebookService, $route,
                        $routeParams)
{
console.log("CalendarController");
//	VARIABLES
	//all available dates for the calendar to render
	$scope.dates = null;
	//the current calendar date
	$scope.currentDate = Date.create("beginning of month");

//	PRIVATE METHODS
	/**
	 * Gets the list of dates for the current month
	 * @param month
	 */
	var getDates = function(){
		var date;
		var dates = [];
		var daysInMonth = $scope.currentDate.daysInMonth()-1; //make it 0 based

		//add an item to the dates array
		var addItem = function(days, isOutsideMonth){
			date = $scope.currentDate.clone();
			date.addDays(days, true);
			dates.push({date: date, disabled: isOutsideMonth === true});
		};

		//get the last N days of last month for the week
		($scope.currentDate.getDay()).downto(1, function(i){
			addItem(-i, true);
		});
		//get all 28/30/31 days in the month
		(0).upto(daysInMonth, function(i){
			addItem(i);
		});
		//get the remaining/possible days left in the week for next month
		(0).upto(5-$scope.currentDate.endOfMonth().getDay(), function(i){
			addItem($scope.currentDate.daysInMonth()+i, true);
		});

		return dates.inGroupsOf(7); //make them groups for the weeks
	};

	/**
	 * Updates the date array
	 */
	var updateDates = function(direction){
		if(direction !== 0){
			$scope.currentDate.addMonths(direction);
			$scope.currentDate.set({date: 1});
		}
		$scope.dates = getDates();
	};

//	SCOPE METHODS
	/**
	 * Select the current date
	 */
	$scope.selectDate = function(date){
		console.log('current date --> ' + date);
		$scope.currentDate = date.clone();
		
	};

	/**
	 * Go to the previous month
	 */
	$scope.previousMonth = function(){
		updateDates(-1);
	};

	/**
	 * Go to the next month
	 */
	$scope.nextMonth = function(){
		updateDates(1);

	};

//	INIT
	updateDates(0);
	
//	MODULE
	/**
	 * Using the module pattern but nothing to return here
	 */
	return {};
};