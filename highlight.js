import React, {PropTypes as type, Component} from 'react';
import Mark from 'front-markjs';

export default class Highlighter extends Component {
    static propTypes = {
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

    componentDidMount() {
        this.markInstance = new Mark(this.context);
        this.mark();
    }

    mark() {
        const {word, children, ...props} = this.props;
        this.markInstance.mark(word, props);
    }

    componentDidUpdate() {
        this.mark();
    }

    redner() {
        return <span ref={(e => this.context = e)}>{this.props.children}</span>;
    }
}