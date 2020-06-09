

const get_my_location = {
    timeout: null,

    clearActiveTimeout(){
        clearTimeout(this.timeout);
    },

    getLocation(){
        $('#my_location_results').val('');
        $('#copy-btn').hide();
        $('.alert').hide();
        this.clearActiveTimeout();
        if(navigator.geolocation){
            $('.alert-info').show();
            navigator.geolocation.getCurrentPosition((position)=>{
                this.onLocationReceived(position)
            }, ()=>{
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
        const clipboard = new ClipboardJS('#copy-btn');
        $('#get-location-btn').click((evt)=>{
            this.getLocation();
        });
        $('#copy-btn').click((evt)=>{
            $('.alert').hide();
            this.showAlert($('.alert-location-copied'));
            $(evt.currentTarget).hide();
            $('#get-location-btn').show();
        });
    },

    onLocationNotReceived(){
        this.showAlert($('.alert-warning'));
    },

    onLocationReceived(position){
        const link = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
        const verbiage = `My location:\n\n${link}`;
        $('#my_location_results').val(verbiage);
        $('#copy-btn').show();
        $('#get-location-btn').hide();
        this.showAlert($('.alert-location-received'));
    },

    showAlert($alert){
        $('.alert').hide();
        $alert.show();
        this.clearActiveTimeout();
        this.timeout = setTimeout(()=>{
            $alert.hide();
        }, 10000);
    }
};

$(document).ready(()=>{
    get_my_location.init();
});
