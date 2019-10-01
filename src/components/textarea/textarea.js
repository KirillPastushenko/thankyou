import React, { PureComponent, Fragment } from "react";
import ContentEditable from "react-contenteditable";
import "./textarea.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker, Emoji } from "emoji-mart";
import { FaRegSmile } from "react-icons/fa";

class Textarea extends PureComponent {
  constructor() {
    super();
    this.contentEditable = React.createRef();
    this.state = {
      pickerShow: false
    };
  }
  handleChange = e => {
    const { onChange, name } = this.props;
    onChange(name, e.target.value);
  };

  addEmoji = e => {
    const { onChange, name } = this.props;
    let test = (
      <span
        contentEditable={false}
        dangerouslySetInnerHTML={{
          __html: Emoji({
            html: true,
            emoji: e.id,
            size: 18
          })
        }}
      ></span>
    );
    this.contentEditable.current.focus();
    pasteHtmlAtCaret(
      "&nbsp;" + test.props.dangerouslySetInnerHTML.__html + "&nbsp;"
    );
    const value = this.contentEditable.current.innerHTML;
    onChange(name, value);
  };
  handleMouseEnter = e => {
    this.setState({ pickerShow: true });
  };
  handleMouseLeave = e => {
    this.setState({ pickerShow: false });
  };
  render() {
    const { value } = this.props;
    const { pickerShow } = this.state;
    return (
      <Fragment>
        <div className="textAreaContainer">
          <div
            className="pickerContainer"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <FaRegSmile
              className="emojiPicker"
            />
            {pickerShow && <Picker set="emojione" onSelect={this.addEmoji} />}
          </div>
          <ContentEditable
            innerRef={this.contentEditable}
            html={value}
            onChange={this.handleChange}
            className="textArea"
          />
          {/* <textarea value={value} onChange={this.handleChange}>
            
          </textarea> */}
        </div>
      </Fragment>
    );
  }
}

function pasteHtmlAtCaret(html) {
  var sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(),
        node,
        lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type != "Control") {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
}

export default Textarea;
