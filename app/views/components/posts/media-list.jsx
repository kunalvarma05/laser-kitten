var remote = window.require('remote');
var BrowserWindow = remote.require('browser-window');

var React = require('react');

module.exports = React.createClass({
    render: function() {
        return <div className="post-media">
            {this.props.media ? this.renderMedia() : null}
        </div>
    },
    renderNoMedia: function() {
        return <h3 className="text-center">No Media</h3>
    },
    renderMedia: function() {
        return this.props.media.map(function(mediaItem) {
            return this.renderMediaItem(mediaItem);
        }.bind(this));
    },
    renderMediaItem: function(mediaItem) {
        var item = '';
        switch(mediaItem.media_type) {
            case 'image':
                item = <div className="text-center media-item" key={mediaItem.id}>
                    <img 
                        className="img-responsive img-thumbnail" 
                        src={mediaItem.image_url} 
                        data-original-width={mediaItem.original_width}
                        data-original-height={mediaItem.original_height}
                        onClick={this.handleImgClick} />
                </div>
                break;

            case 'audio':
                item = null;
                break;

            case 'video':
                item = null;
                break;

            default:
                item = null;
                break;
        }
        return item;
    },

    handleImgClick: function(e) {
        e.preventDefault();

        var ct = e.currentTarget;

        var imgUrl = ct.getAttribute('src');
        var width = parseInt(ct.getAttribute('data-original-width'), 10);
        var height = parseInt(ct.getAttribute('data-original-height'), 10);

        var imgWindow = new BrowserWindow({
            alwaysOnTop: true,
            skipTaskbar: true,
            show: false,
            'web-preferences': {
                'node-integration': false,
                javascript: false,
                webglweb: false,
                audio: false,
                plugins: false,
            }
        });
        imgWindow.loadUrl(imgUrl);
        imgWindow.setTitle('Media Preview');
        imgWindow.setContentSize(width, height);
        imgWindow.show();

        imgWindow.on('close', function() {
            imgWindow.destroy();
        });
    }
});