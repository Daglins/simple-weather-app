$(function() 
{   
    $('form').append('<button type="button" >Submit</button>');
    
    $('form').on('click', 'button', function()
    {
        var $zip = $('#zip').val();
        var $api = $('input','#apikey').val();
         if ($api == '' )
        {
            clearResults();
            $('#weather').append('<p>Please enter an api key </p>');
        }
        else if ($zip == '')
        {
            clearResults();
            $('#weather').append('<p>Please enter a zipcode</p>');
        }
        else
        {
            getTemp($zip,$api);
        }
    });
    
    function clearResults()
    {
        $('#weather').children().remove();
    }
    
    function getTemp(zip,api)
    {
        $.getJSON('//api.openweathermap.org/data/2.5/weather?zip='+ zip +',us&appid='+ api).done(
        function(data)
        {   
            clearResults();
            var things = data.main;
            var lstItem = '';
            var kelvin = ((things.temp * (9/5)) - 459.67);
            var temperature = kelvin.toString().substring(0,5);
            lstItem += '<p>' + temperature + '°F</p>';
            
            var desc = data.weather;
            var lower = desc[0].description;
            var upper = lower.substring(0, 1).toUpperCase() + lower.substring(1);
            lstItem += '<p>' + upper + '</p>';
            
            $('#weather').append(lstItem);
        }).fail(function()
                {
                    clearResults();
                    $('#weather').append('<p>Error retrieving data :( </p>');
                }); 
    }
});