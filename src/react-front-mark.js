import React, {PropTypes as type, Component} from 'react';
import FrontMark from 'front-markjs';

export default class Mark extends Component {
    static propTypes = {
        text: type.string,
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
    };

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
    };

    done = (args) => {
        const {done} = this.props;
        if (done) done.apply(null, args);
        this.marked = !this.marked;
    };

    mark() {
        if (!this.marked) {
            const {text, children, done, ...props} = this.props;
            if (text) {
                this.markInstance.mark(text, {done: this.done, ...props});
            }
        }
    }

    unmark() {
        if (this.marked) {
            this.markInstance.unmark();
        }
    }

    componentDidMount() {
        this.markInstance = new FrontMark(this.context);
        this.marked = false;
        this.mark();
    }

    render() {
        return <span ref={(e => this.context = e)}>{this.props.children}</span>;
    }
}
