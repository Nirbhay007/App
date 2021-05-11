import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {withOnyx} from 'react-native-onyx';
import ONYXKEYS from '../ONYXKEYS';
import ReportActionItemIOUQuote from './ReportActionItemIOUQuote';
import ReportActionPropTypes from '../pages/home/report/ReportActionPropTypes';
import ReportActionItemIOUPreview from './ReportActionItemIOUPreview';
import Navigation from '../libs/Navigation/Navigation';
import ROUTES from '../ROUTES';

const propTypes = {
    // All the data of the action
    action: PropTypes.shape(ReportActionPropTypes).isRequired,

    // The associated chatReport
    chatReportID: PropTypes.number.isRequired,

    // Should render the preview Component?
    shouldDisplayPreview: PropTypes.bool.isRequired,

    /* --- Onyx Props --- */
    // ChatReport associated with iouReport
    chatReport: PropTypes.shape({
        // The participants of this report
        participants: PropTypes.arrayOf(PropTypes.string),
    }),
};

const defaultProps = {
    chatReport: {},
};

class ReportActionItemIOUAction extends Component {
    constructor(props) {
        super(props);

        this.launchIOUDetailsModal = this.launchIOUDetailsModal.bind(this);
    }

    /**
     *
     * Launch the IOU Details Modal, using data from the report action
     */
    launchIOUDetailsModal() {
        Navigation.navigate(ROUTES.getIouDetailsRoute(
            this.props.chatReportID, this.props.action.originalMessage.IOUReportID,
        ));
    }

    render() {
        const hasMultipleParticipants = this.props.chatReport.participants.length >= 2;
        return (
            <View>
                <ReportActionItemIOUQuote
                    action={this.props.action}
                    shouldShowViewDetailsLink={!hasMultipleParticipants}
                    onViewDetailsPressed={this.launchIOUDetailsModal}
                />
                {this.props.shouldDisplayPreview && (
                    <ReportActionItemIOUPreview
                        iouReportID={this.props.action.originalMessage.IOUReportID}
                        onPayButtonPressed={this.launchIOUDetailsModal}
                    />
                )}
            </View>
        );
    }
}

ReportActionItemIOUAction.propTypes = propTypes;
ReportActionItemIOUAction.defaultProps = defaultProps;
ReportActionItemIOUAction.displayName = 'ReportActionItemIOUAction';

export default withOnyx({
    chatReport: {
        key: ({chatReportID}) => `${ONYXKEYS.COLLECTION.REPORT}${chatReportID}`,
    },
})(ReportActionItemIOUAction);
