//jshint esversion:6

// module.exports =  {what,formattedDate} ;


const daysOfTheWeek = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] ;

// Note: 'exports' is short for module.exports
// Note: '(a,b) =>'  is equiv to 'function(a,b)'

exports.whatDay = (day) => {
  return daysOfTheWeek[day % daysOfTheWeek.length] ;
}

exports.formattedDate = () => {

  return new Date().toLocaleDateString("en-US",{
    weekday:"long",
    day: "numeric",
    month: "long",
    // year: "numeric"
  }) ;

}

exports.getDayString = () => {
    return whatDay(getDay()) ;
}

exports.getDay = () => {
    return new Date().getDay() ;
}
