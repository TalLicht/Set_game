class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let class_name = this.props.selected ? "card selected" : "card";
        return (
            <div className={class_name} onClick={() => this.props.onClick(this.props.index)}>
                <img src={this.props.image} />
            </div>
        );
    }
}

class Row extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        let cards = this.createCards();
        this.state = {
            cardsChoosen: [],
            selectedCards: this.generateCards(cards)
        };
        this.selectCard = this.selectCard.bind(this);
        this.creatingRows = this.creatingRows.bind(this);
    }


    selectCard(cardIndex) {
        let selectedCards = this.state.selectedCards;
        selectedCards[cardIndex].selected = true;
        this.state.cardsChoosen.push(selectedCards[cardIndex]);
        this.setState({
            cardsChoosen: this.state.cardsChoosen,
            selectedCards
        });
        if (this.state.cardsChoosen.length === 3) {
            if (set.isSet(this.state.cardsChoosen)) {
                alert("Great job! you found a set(:");
            } else {
                alert("This is not a set..");
            }

            let selectedCards = this.state.selectedCards;
            selectedCards.forEach(card => {
                card.selected = false;
            });
            this.setState({
                selectedCards,
                cardsChoosen: []
            });
        }
    }

    createCards() {
        let cards = [];
        let url = "https://puzzles.setgame.com/images/setcards/small/";
        let everyNine = 1;
        let colors = ["red", "purple", "green"];
        let currColorIndex = 0;

        for (let i = 1; i <= 81; i++) {
            let color, shape, shading, qty;
            if (i % 3 == 0) {
                if (currColorIndex == 2) {
                    currColorIndex = 0;
                } else {
                    currColorIndex += 1;
                }
            }
            if (i >= 1 && i <= 27) {
                shading = "full";
            } else if (i >= 28 && i <= 54) {
                shading = "striped";
            } else if (i >= 55 && i <= 81) {
                shading = "blank";
            }


            if (everyNine == 1 || everyNine == 4 || everyNine == 7) {
                shape = "wave";
            } else if (everyNine == 2 || everyNine == 5 || everyNine == 8){
                shape = "diamond";
            } else if (everyNine == 3 || everyNine == 6 || everyNine == 9) {
                shape = "elipse";
            }
            color = colors[currColorIndex];

            if (i % 9 == 0) {
                everyNine += 1;
            }


            if (i % 3 == 0) {
                qty = "3";
            } else if (i % 3 == 1) {
                qty = "1";
            } else if (i % 3 == 2) {
                qty = "2";
            }


            let num = i < 10 ? "0" + i : i;
            let img_url = url + num + ".gif";
            let card = {
                index: i,
                image: img_url,
                color: color,
                shape: shape,
                shading: shading,
                qty: qty,
                selected: false
            };

            cards.push(card);
        }

        return cards;
    }

    generateCards(cards) {
        let numOfCards = 12;
        let selectedCards = [];
        //randomly choosing 12 cards
        for (let i = 0; i < numOfCards; i++) {
            let indexToRemove = Math.floor(Math.random() * cards.length);
            let selectedCard = cards[indexToRemove];
            selectedCards.push(selectedCard);
          //remove choosen cards from the array
            if (indexToRemove !== -1) {
                cards.splice(indexToRemove, 1);
            }
        }
        return selectedCards;
    }

  creatingRows(cardsArray) {
    let selectedCards = [];
    for (let i = 0; i < cardsArray.length; i += 4) {
      let end = z + 4;
      let row = cardsArray.slice(z, end);
      selectedCards.push(row);
    }
    let fourInRow = c.map(x => (
      <Row key={`row${z + 1}`} value={x}>
        {" "}
      </Row>
    ));
    return c;
  }

  createRow(start, count) {
    // console.log(start,  count);
    return this.state.selectedCards
      .slice(start, start + count)
      .map(x => (
        <Card
          key={this.state.selectedCards.indexOf(x)}
          index={this.state.selectedCards.indexOf(x)}
          image={x.image}
          color={x.color}
          shape={x.shape}
          shading={x.shading}
          qty={x.qty}
          selected={x.selected}
          onClick={this.selectCard}
        />
      ));
  }

  createRows() {
    const rows = this.state.selectedCards.length / 4;
    const cardRows = [];
    for (let i = 0; i < rows; ++i) {
      cardRows.push(<Row key={i}>{this.createRow(i * 4, 4)}</Row>);
    }
    return cardRows;
  }

  render() {
    return (
      <div id="board">
        <h1 id="title">Welcome to Set game!</h1>
        {this.createRows()}
      </div>
    );
  }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);