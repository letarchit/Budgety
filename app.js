// Budget Controller

var budgetController = (function(){
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var totalExpense = 0;
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
     }

    return {
        addItem: function(type, des, val){
            
            var newItem, ID;
        if(data.allItems[type].length > 0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        }
        else {
            ID ===0;
        }

            // Create new item based in 'inc' and 'exp' type
            if(type === 'exp'){
                //it will call the constructor which is in upside
                newItem = new Expense (ID, des, val); 
            } 
             else if (type === 'inc'){
            
                newItem = new Income (ID, des, val); 
            
            }
            //Push it into our data structure
            data.allItems[type].push(newItem);
            
            //Return the new element
            return newItem;

        },
        testing: function(){
            console.log(data);        
        }
    }

})();


// UI Controller

var UIController =  (function()   {
    
    var DomStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',  
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list' 
    }
    
    
    return {
        getInput: function(){
            return {
                 type: document.querySelector(DomStrings.inputType).value,
                 description: document.querySelector(DomStrings.inputDescription).value,
                 value: document.querySelector(DomStrings.inputValue).value,

        };

    },

    addListItem: function(obj, type){
        var html, newHtml, element; 
        // create HTML string with some placeholder text
        if (type === 'inc'){
            element = DomStrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

        }else if(type === 'exp'){
            element = DomStrings.expensesContainer;
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
          }
        
        //Replace the placeholder text with some actual data
          newHtml = html.replace('%id%', obj.id);
          newHtml = newHtml.replace('%description%', obj.description);
          newHtml = newHtml.replace('%value%', obj.value);
        
          //Insert html into the DOM  
          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    clearFields: function(){
            var fields
    },

    getDomStrings: function() {
        return DomStrings;
    }
    
 };


})();


//Global App Controller
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDomStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){
           
        if (event.keyCode === 13 || event.which === 13) {
               ctrlAddItem();
           
            }
        })
    
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
     // 1.Get the filled input data
        input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 4. Calculate the budget

        // 5. Display the budget on UI

 };
 // setupEventListeners();
  return {
      init: function(){
          console.log('Application has started');
          setupEventListeners();
      }
  } 

   
})(budgetController, UIController);

controller.init();