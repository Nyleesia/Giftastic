$( document ).ready(function() {

    let topics = ['SPEED','POINT BREAK','PARENTHOOD','THE MATRIX'];  
    
    var i;
    for (i = 0; i < topics.length; i++) { 
      $("#topics").append(`<button class="gifSearch btn">${topics[i]}
                            </button>`);
    };

    function toggleAnimate () {
        let state= $(this).attr("data-state");
            
        if (state ==="still"){
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animate")
        }

        else{
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "still")
        }
    }

    function getImages() {
        var topicSearch = $(this).html()+"keanu reeves";

        let apiKey ="U4Nq0FcGsKBjvGbuBAb0mCCE7FehpPfF";
        
        let queryURL="https://api.giphy.com/v1/gifs/search";
            
        $.ajax({
            url: queryURL,
            method: "GET",
            data:{api_key: apiKey, q: topicSearch, limit: "10", offset: Math.floor(Math.random()*20), lang: "en"}
            })
            .then(function(gifs) {                              
            
            $("#gifContainer").empty();
            $.each(gifs.data, function( index, value ) {
                $("#gifContainer").append(`<div class="container-wrap-wrap" id="gifBadges">
                                                <div id= "${value.id}" class="gifImage"> 
                                                <img class="toggleAnimate" src="${value.images.fixed_width_still.url}" 
                                                height="150px" width="150px"
                                                data-still= "${value.images.fixed_width_still.url}" 
                                                height="150px" width="150px"
                                                data-animate= "${value.images.fixed_width.url}"
                                                height="150px" width="150px"
                                                data-state="still" class="gif"</img></div>
                                                <div class="rating"> Rating: ${value.rating.toUpperCase()}</div>
                                            </div>`);
            });

            $(".toggleAnimate").off("click");
            $(".toggleAnimate").click(toggleAnimate);
        });
    }

    $(".gifSearch").off("click");
    $(".gifSearch").click(getImages);

    function addNew() {
        let newTopic=$("#newRequest").val().trim().toUpperCase();
        if (newTopic==""){
            return;
        }
        else if($.inArray(newTopic, topics)!== -1){
            return;   
        }
        topics.push(newTopic);
        $("#topics").append(`<button class="gifSearch btn" id="value">${newTopic}
        </button>`);
        $(".gifSearch").off("click");
        $(".gifSearch").click(getImages);
        document.getElementById("addTopic").reset();
        //OR: $("#addTopic")[0].reset();
    }
        
    $(document).on('submit','form#addTopic',function(event){
        event.preventDefault();
        addNew();
    });
    $("#add").click(function(event){
        event.preventDefault();
        addNew();
    });
});
