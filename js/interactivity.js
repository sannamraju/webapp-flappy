jQuery("#scoresbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>" +
            "<li>" + "Me" + "</li>" +
            "<li>" + "Also me" + "</li>" +
            "<li>" + "Me again" + "</li>" +
        "</ul>"
    );
});

jQuery("#creditsbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<div>" + "Game created by Shreyas Annamraju!" + "</div>"
    );
});

jQuery("#helpbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>" + "<li>" + "Avoid the incoming pipes" + "</li>" + "</ul>"
    );
});
function registerScore(){
var playerName = prompt("What is your name?");
var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li> ";
jQuery("#content").append(
  "<ul>" + scoreEntry + "</ul>"
);
  score = 0;
  game.state.restart();
}
