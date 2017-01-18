// Alignment toolbar view.
// - Toolbar buttons for alignment.

import * as Actions from '../../actions/Actions';
import { remote } from 'electron';
import * as React from 'react';
import { alignmentLabelingStore, alignmentLabelingUiStore, uiStore } from '../../stores/stores';
import { observer } from 'mobx-react';


export interface AlignmentToolbarProps {
    top: number;
    left: number;
    viewWidth: number;
    viewHeight: number;
}

@observer
export class AlignmentToolbar extends React.Component<AlignmentToolbarProps, {}> {
    public refs: {
        [name: string]: Element
    };

    constructor(props: AlignmentToolbarProps, context: any) {
        super(props, context);
        this.loadDataOrVideo = this.loadDataOrVideo.bind(this);
        this.loadReferenceVideo = this.loadReferenceVideo.bind(this);
    }

    private loadReferenceVideo(): void {
        remote.dialog.showOpenDialog(
            remote.BrowserWindow.getFocusedWindow(),
            {
                properties: ['openFile'],
                filters: [
                    { name: 'WebM videos', extensions: ['webm'] },
                    { name: 'Other supported videos', extensions: ['mp4', 'mov'] }
                ]
            },
            (fileNames: string[]) => {
                if (fileNames && fileNames.length === 1) {
                    alignmentLabelingStore.loadReferenceTrack(fileNames[0]);
                }
            });
    }

    private loadDataOrVideo(): void {
        remote.dialog.showOpenDialog(
            remote.BrowserWindow.getFocusedWindow(),
            {
                properties: ['openFile'],
                filters: [
                    { name: 'Sensor data', extensions: ['tsv'] },
                    { name: 'WebM videos', extensions: ['webm'] },
                    { name: 'Other supported videos', extensions: ['mp4', 'mov'] }
                ]
            },
            (fileNames: string[]) => {
                if (fileNames && fileNames.length === 1) {
                    if (fileNames[0].match(/\.tsv$/i)) {
                        alignmentLabelingStore.loadSensorTrack(fileNames[0]);
                    }
                    if (fileNames[0].match(/\.(webm|mp4|mov)$/i)) {
                        alignmentLabelingStore.loadVideoTrack(fileNames[0]);
                    }
                }
            });
    }

    public render(): JSX.Element {
        return (
            <div className='labeling-toolbar-view' style={{
                position: 'absolute',
                top: this.props.top + 'px',
                left: this.props.left + 'px',
                width: this.props.viewWidth + 'px',
                height: this.props.viewHeight + 'px'
            }}>
                <button className='tbtn tbtn-l1'
                    title='Load/replace the reference track'
                    onClick={this.loadReferenceVideo}>
                    <span className='glyphicon glyphicon-folder-open'></span>Load Reference Video...
                </button>
                {' '}
                <button className='tbtn tbtn-l1'
                    title='Load a sensor track from collected data'
                    onClick={this.loadDataOrVideo}>
                    <span className='glyphicon glyphicon-folder-open'></span>Load Video or Sensor...
                </button>
                {' '}
                <span className='sep' />
                {' '}
                <button className='tbtn tbtn-l3' title='Zoom in'
                    onClick={() => {
                        alignmentLabelingUiStore.referenceViewPanAndZoom(0, -0.2, 'center');
                        uiStore.referenceViewPanAndZoom(0, -0.2, 'center');
                    } }>
                    <span className='glyphicon icon-only glyphicon-zoom-in'></span>
                </button>
                {' '}
                <button className='tbtn tbtn-l3' title='Zoom out'
                    onClick={() => {
                        alignmentLabelingUiStore.referenceViewPanAndZoom(0, +0.2, 'center');
                        uiStore.referenceViewPanAndZoom(0, +0.2, 'center');
                    } }>
                    <span className='glyphicon icon-only glyphicon-zoom-out'></span>
                </button>
                {' '}
                <span className='sep' />
                {' '}
                <button className='tbtn tbtn-l3' title='Go to the beginning'
                    onClick={() => {
                        alignmentLabelingUiStore.referenceViewPanAndZoom(-1e10, 0);
                        uiStore.referenceViewPanAndZoom(-1e10, 0);
                    } }>
                    <span className='glyphicon icon-only glyphicon-fast-backward'></span>
                </button>
                {' '}
                <button className='tbtn tbtn-l3' title='Go to the previous page'
                    onClick={() => {
                        alignmentLabelingUiStore.referenceViewPanAndZoom(-0.6, 0);
                        uiStore.referenceViewPanAndZoom(-0.6, 0);
                    } }>
                    <span className='glyphicon icon-only glyphicon-backward'></span>
                </button>
                {' '}
                <button className='tbtn tbtn-l3' title='Go to the next page'
                    onClick={() => {
                        alignmentLabelingUiStore.referenceViewPanAndZoom(+0.6, 0);
                        uiStore.referenceViewPanAndZoom(+0.6, 0);
                    } }>
                    <span className='glyphicon icon-only glyphicon-forward'></span>
                </button>
                {' '}
                <button className='tbtn tbtn-l3' title='Go to the end'
                    onClick={() => {
                        alignmentLabelingUiStore.referenceViewPanAndZoom(+1e10, 0);
                        uiStore.referenceViewPanAndZoom(+1e10, 0)
                    } }>
                    <span className='glyphicon icon-only glyphicon-fast-forward'></span>
                </button>
            </div>
        );
    }
}