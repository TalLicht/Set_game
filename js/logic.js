window.set={}

set.isSet = function (cards) {
    if (
        ( (cards[0].color === cards[1].color && cards[0].color === cards[2].color) || (cards[0].color !== cards[1].color && cards[0].color  !== cards[2].color && cards[1].color  !== cards[2].color )) &&
        ( (cards[0].shape === cards[1].shape && cards[0].shape === cards[2].shape) || (cards[0].shape !== cards[1].shape && cards[0].shape !== cards[2].shape && cards[1].shape !== cards[2].shape))&&
        ( (cards[0].shading === cards[1].shading && cards[0].shading === cards[2].shading) || (cards[0].shading !== cards[1].shading && cards[0].shading  !== cards[2].shading && cards[1].shading  !== cards[2].shading ))&&
        ( (cards[0].qty === cards[1].qty && cards[0].qty === cards[2].qty) || (cards[0].qty !== cards[1].qty && cards[0].qty  !== cards[2].qty && cards[1].qty  !== cards[2].qty )) 
    ){
        return true; }

    return false;
};
