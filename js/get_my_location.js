

const get_my_location = {
    timeout: 10000,

    getLocation(){
        if(navigator.geolocation){
            $('.alert-info').show();
            navigator.geolocation.getCurrentPosition((position)=>{
                $('.alert-info').hide();
                this.onLocationReceived(position)
            }, ()=>{
                $('.alert-info').hide();
                this.onLocationNotReceived();
            }, {
                enableHighAccuracy: true
            });
        }
        else{
            this.onLocationNotReceived();
        }
    },

    init(){
        $('form#get_my_location').submit((evt)=>{
            evt.preventDefault();
            this.getLocation();
        })
    },

    onLocationNotReceived(){
        $('.alert-warning').show();
        setTimeout(()=>{
            $('.alert-warning').hide();
        }, this.timeout);
    },

    onLocationReceived(position){
        const link = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
        const verbiage = `My location:\n\n${link}`;
        const $textarea = document.querySelector('#my_location_results');
        $textarea.innerHTML = verbiage;
        $textarea.select();
        document.execCommand('copy');

        $('.alert-success').show();
        setTimeout(()=>{
            $('.alert-success').hide();
        }, this.timeout);
    }


};

$(document).ready(()=>{
    get_my_location.init();
});
