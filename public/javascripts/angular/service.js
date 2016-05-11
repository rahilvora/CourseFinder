/**
 * Created by rahilvora on 10/05/16.
 */

UserApp.factory('myService', myService);

function myService(){

    var subcategories = {
        webDevelopment:[],
        mobileDevelopment:[],
        bigData:[],
        finance:[],
        accounting:[]
    }

    return {

        store : function(data){
            subcategories.webDevelopement = data.webDevelopment;
            subcategories.mobileDevelopment = data.mobileDevelopment;
            subcategories.bigData = data.bigData;
            subcategories.finance = data.finance;
            subcategories.accounting = data.accounting;
        },

        getData : function(){
            return subcategories;
        }
    }

}


