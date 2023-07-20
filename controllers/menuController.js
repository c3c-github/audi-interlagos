const jsforce = require('jsforce');

const menu = (req, res) => {
    res.render("menu", {} );
}
const formPay = (req, res) => {
    res.render("form", {form : {'name': 'PAYMENTS'}} );
}
const formVentures = (req, res) => {
    res.render("form", {form : {'name': 'VENTURES'}} );
}
const formPrime = (req, res) => {
    res.render("form", {form : {'name': 'PRIME'}} );
}
const formCheckOut = (req, res) => {
    res.render("form", {form : {'name': 'CHECKOUT'}} );
}
const formApp = (req, res) => {
    res.render("form", {form : {'name': 'APP'}} );
}

const thanks = (req, res) => {
        // replace with your Salesforce Connected App credentials
        const clientId = '3MVG9cHH2bfKACZa7IhT4bhgY3L.B7OfXN5.2Q8eEu_jK7ebe1SeIwayHY1AdDQt0rK7VYwgVMivS2ge1W86T';
        const clientSecret = '325E76F1AE9726A62C8FAA69A0F7281078E5DDC5EA437053331913175F15EFF7';
        const username = 'mauro.araripe@c3csoftware.com.br';
        const password = 'c3c*2023';
        const securityToken = 'czFFo1un2JJxVP88If9Zqh16';
    
        const conn = new jsforce.Connection({
            oauth2: {
                clientId: clientId,
                clientSecret: clientSecret,
                redirectUri: 'http://localhost:3000/oauth2/callback' // replace with your callback URL
            }
        });

        conn.login(username, password + securityToken, function(err, userInfo) {
            if (err) { return console.error(err); }
            console.log('Logged in to Salesforce');
            console.log('Access Token: ' + conn.accessToken);
            console.log('Instance URL: ' + conn.instanceUrl);
            console.log('body: ',req.body);
            console.log('body.product: ',req.body.product);
            console.log('body.product.typeof: ', typeof (req.body.product) )

            var product = '';

            if(req.body.product != undefined){
                if(typeof req.body.product == 'string'){
                    product = req.body.product;
                }
                else{
                    for(var i =0 ; i < req.body.product.length; i++){
                        product = product + req.body.product[i] + ';'
                    }
                }
                console.log('product: ',product);
            }

            var recordTypeId = '';

            switch (req.body.formType) {
                case 'PAYMENTS':
                    recordTypeId = '012HY0000004La3YAE';
                    break
                case 'VENTURES':
                    recordTypeId = '012HY0000004La8YAE';
                    break
                case 'PRIME':
                    recordTypeId = '012HY0000004LaDYAU';
                    break
                case 'CHECKOUT':
                    recordTypeId = '012HY0000004LaIYAU';
                    break
                case 'APP':
                    recordTypeId = '012HY0000004LaNYAU';
                    break
                default:
                    recordTypeId = '012HY0000004LXiYAM';
                    break
              }
            

            const lead = {
                RecordTypeId : recordTypeId,
                LastName : req.body.name,
                Email : req.body.email,
                MobilePhone : req.body.phone,
                Company : req.body.company,
                ProdutosDeinteresse__c : product,
                Description : req.body.message,
                JaInvesteCripto__c : req.body.cripto,
                ColaboradorTransfero__c : req.body.ownerName,
                OrigemWebSummit__c : req.body.formType,
                Advisor__c : req.body.advisor
            };  
    
            conn.sobject('Lead').create(lead, function(err, result) {
            if (err) {return console.error(err); }
                console.log('Lead inserted with Id: ' + result.id);                
            });
            
            res.render("thanks", {form : {'name': req.body.formType}} );

        });

        conn.version = '54.0';

        /*
            IndicacaoNome__c : req.body.ownerName
        */


        
}

module.exports =  {
    menu,
    formPay,
    formVentures,
    formPrime,
    formCheckOut,
    formApp,
    thanks
};