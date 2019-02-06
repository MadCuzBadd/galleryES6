class Gallery{
    constructor(Sselector){
    this.gallery1 = $(Sselector);
    this.pictures = this.gallery1.find('.b-picture');
    this.arrowNext = this.gallery1.find('.b-preview__arrow_next');
    this.arrowPrew = this.gallery1.find('.b-preview__arrow_prev');
    this.preview = this.gallery1.find('.b-preview');
    this.previewImage = this.gallery1.find('.b-preview__image');
    this.previewText = this.gallery1.find('.b-preview__text');
    this.currentPictureIndex = 0;
    this.max = this.pictures.length; 
    this.currentPlace = this.gallery1.find('.b-preview__currentPlace');
    this.maxPlace = this.gallery1.find('.b-preview__maxPlace');
    this.callEvents();
}
    
    openPreview(event){
        var jqPicture = $(event.currentTarget);
        console.log(jqPicture);
        this.currentPictureIndex = this.pictures.index(jqPicture);
        console.log(this.currentPictureIndex);
        this.showImage(0);
        this.preview.addClass('b-preview_shown');
    }

    closePrivew(event){
        //console.log(this);
        //console.log('target: ', event.target);
        //console.log('currentTarget: ', event.currentTarget);

        if(!event || $(event.target).hasClass('b-preview')){
            this.preview.removeClass('b-preview_shown');
        };
    }

    showPrevious(){
        this.showImage(-1);
    }

    showNext(){
        this.showImage(1)
    }

    showImage(iStep){
        this.currentPictureIndex += iStep;
        if(this.currentPictureIndex >= this.max){
            this.currentPictureIndex = 0;
        }
        else if(this.currentPictureIndex < 0){
            this.currentPictureIndex = this.max -1;
        }
        var jqPicture = this.pictures.eq(this.currentPictureIndex);
        console.log("jqPicture", jqPicture);
        var jqSmallImage = jqPicture.children('.b-picture__image');
        console.log(jqSmallImage.attr("class"));
        var smallImageSrc = jqSmallImage.attr('src');
        console.log(smallImageSrc);
        var bigImageSrc = smallImageSrc.replace('small_', '');
        this.previewImage.attr('src', bigImageSrc);
        var smalImTex = jqSmallImage.attr('alt');
        console.log(smalImTex);
        this.previewText.text(smalImTex);
        this.currentPlace.text(this.currentPictureIndex + 1);
        this.maxPlace.text(this.max);
    }

    escapeHidePreview(event){
        console.log(event.which);
        if(event.which == 27){
            this.closePrivew();
        }
    }

    callEvents(){
    this.pictures.click(this.openPreview.bind(this));
    this.arrowNext.click(this.showNext.bind(this));
    this.arrowPrew.click(this.showPrevious.bind(this));
    this.preview.click(this.closePrivew.bind(this));
    $('body').keyup(this.escapeHidePreview.bind(this));
    }
}
