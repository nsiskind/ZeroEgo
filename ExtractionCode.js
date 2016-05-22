var havenondemand = require('havenondemand')
var client = new havenondemand.HODClient('2c4f760b-08a4-4d0f-a7a8-c727ee2c2a3f')

var async = require('async')

var url = ['https://twitter.com/MSWindows7' , 'https://twitter.com/mubix?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' , 
'https://twitter.com/taviso?lang=en' , 'https://twitter.com/TrustedSec?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor']
//var words = ['AR-15', 'guns']
//var twitterHandles = [{name: "Rob Fuller", twitterHandle: "@mubix"}]


function process(url) {
  
  var data1 = {url: url, entity_type: ['people_eng', 'organizations']}
  client.call('extractentities', data1, function(err1, resp1, body1) {
    if (!err1) {
      var entities = resp1.body.entities
    }


    var data2 = {url: url}
    // client.call('extractconcepts', data2, function(err2, resp2, body2) {
      // if (!err2) {
      //   var concepts = resp2.body.concepts
       
        
        client.call('analyzesentiment', data2, function(err3, resp3, body3){
            var sentiments = resp3.body
            var score = resp3.body.aggregate.score
            
           
            
            
            var payload = {entities:entities, score: score}
            //if(payload.entities.score > .3){
            console.log(payload) 
            return payload 
              
            
        })
      })
}


for (var i = 0; i < url.length; i++){
 process(url[i]) 
}
