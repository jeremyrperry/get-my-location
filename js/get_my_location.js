

const get_my_location = {
    timeout: 10000,

    getLocation(){
        $('#my_location_results').val('');
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
    
    getSelectionIOS($textarea){
        const editable = $textarea.contentEditable;
        const readOnly = $textarea.readOnly;
        $textarea.contentEditable = true;
        $textarea.readOnly = true;
        const range = document.createRange();
        range.selectNodeContents($textarea);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        $textarea.setSelectionRange(0, 999999);
        $textarea.contentEditable = editable;
        $textarea.readOnly = readOnly;
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
        $textarea.value = verbiage;
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
            this.getSelectionIOS($textarea);
        }
        else{
            $textarea.select();
        }
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
