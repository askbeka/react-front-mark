import React, {PropTypes as type, Component} from 'react';
import Mark from 'front-markjs';

export default class ReactMark extends Component {
    
    static propTypes = {
        word: type.string,
        children: type.any,
        element: type.string,
        className: type.string,
        exclude: type.array,
        separateWordSearch: type.bool,
        accuracy: type.oneOfType([
            type.oneOf(['partially', 'complementary', 'exactly']),
            type.shape({
                value: type.oneOf(['partially', 'complementary', 'exactly']),
                limiters: type.arrayOf(type.string)
            })
        ]),
        diacritics: type.bool,
        synonyms: type.object,
        iframes: type.bool,
        acrossElements: type.bool,
        caseSensitive: type.bool,
        ignoreJoiners: type.bool,
        each: type.func,
        filter: type.func,
        noMatch: type.func,
        done: type.func,
        debug: type.bool,
        log: type.object
    }

    static defaultProps = {
        element: 'mark',
        className: '',
        exclude: [],
        separateWordSearch: true,
        accuracy: 'partially',
        diacritics: true,
        synonyms: {},
        iframes: false,
        acrossElements: false,
        caseSensitive: false,
        ignoreJoiners: false,
        debug: false,
        log: window.console
    }

    componentDidMount() {
        this.markInstance = new Mark(this.context);
        this.mark();
    }

    componentWillUpdate() {
        this.unmark();
    }

    componentDidUpdate() {
        this.mark();
    }

    mark() {
        const {word, children, ...props} = this.props;
        if (word) {
            this.marked = true;
            this.markInstance.mark(word, props);
        }
    }

    unmark() {
        if (this.marked) {
            this.markInstance.unmark();
            this.marked = false;
        }
    }

    redner() {
        return <span ref={(e => this.context = e)}>{this.props.children}</span>;
    }
}
