

const get_my_location = {
    timeout: null,

    clearActiveTimeout(){
        clearTimeout(this.timeout);
    },

    getLink(position){
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const option = $( "#choose_map option:selected" ).val();
        switch(option){
            case 'google':
                return `https://maps.google.com/?q=${lat},${lon}`;
                break;
            case 'bing':
                return `https://www.bing.com/maps?cp=${lat}~-${lon}&lvl=16&sp=point.${lat}_${lon}_My%20Location`;
                break;
            case 'apple':
                return `http://maps.apple.com/?ll=4${lat},${lon}&q=My+Location`;
                break;
            case 'osm':
                return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=16`;
                break;
            default:
                return `${lat},${lon}`;
        }
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
        });
    },

    onLocationNotReceived(){
        this.showAlert($('.alert-warning'));
    },

    onLocationReceived(position){
        const link = this.getLink(position);
        const verbiage = `My location:\n\n${link}`;
        $('#my_location_results').val(verbiage);
        $('#copy-btn').show();
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
