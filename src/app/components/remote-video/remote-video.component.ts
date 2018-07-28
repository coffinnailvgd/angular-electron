import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remote-video',
  templateUrl: './remote-video.component.html',
  styleUrls: ['./remote-video.component.scss']
})
export class RemoteVideoComponent implements OnInit {

  private localPeerConnection;
  private remotePeerConnection;
  private servers = null;
  private startTime = null;
  private localStream;
  private remoteStream;
  private offerOptions = {
    offerToReceiveVideo: 1,
  };
  private mediaStreamConstraints = {
    video: {
      mandatory: {
        minWidth: 200,
        maxWidth: 200,
        minHeight: 150,
        maxHeight: 150
      }
    }
  };
  private localVideo;
  private remoteVideo;

  constructor() {
  }

  ngOnInit() {
  }

  handleConnection(event) {
    const peerConnection = event.target;
    const iceCandiate = event.canidate;

    if (iceCandiate) {
      const newIceCanidate = new RTCIceCandidate(iceCandiate);
      const otherPeer = this.getOtherPeer(peerConnection);

      otherPeer.addIceCandidate(newIceCanidate).
        then(() => {
          this.handleConnectionSuccess(peerConnection);
      }).catch((error) => {
        this.handleConnectionFailure(peerConnection, error);
      });

      this.trace(`${this.getPeerName(peerConnection)} ICE candidate:\n` +
        `${event.candidate.candidate}.`);
    }
  }

  handleConnectionSuccess(peerConnection) {
    this.trace(`${this.getPeerName(peerConnection)} addIceCandidate success.`);
  }

  handleConnectionFailure(peerConnection, error) {
    this.trace(`${this.getPeerName(peerConnection)} failed to add ICE Candidate:\n` +
      `${error.toString()}.`);
  }

  handleConnectionChange(event) {
    const peerConnection = event.target;
    console.log('ICE state change event: ', event);
    this.trace(`${this.getPeerName(peerConnection)} ICE state: ` +
      `${peerConnection.iceConnectionState}.`);
  }

  getOtherPeer(peerConnection) {
    return (peerConnection === this.localPeerConnection) ?
      this.localPeerConnection : this.remotePeerConnection;
  }

  getPeerName(peerConnection) {
    return (peerConnection === this.localPeerConnection) ?
      'localPeerConnection' : 'remotePeerConnection';
  }

  trace(text) {
    text = text.trim();
    const now = (window.performance.now() / 1000).toFixed(3);
    // console.log(now, text);
  }

  connectRemote() {
    this.trace('starting call.');
    this.startTime = window.performance.now();

    const videoTracks = this.localStream.getVideoTracks();
    const audioTracks = this.localStream.getAudioTracks();
    if (videoTracks.length > 0) {
      this.trace(`Using video device: ${videoTracks[0].label}.`);
    }
    if (audioTracks.length > 0) {
      this.trace(`Using audio device: ${audioTracks[0].label}.`);
    }

    this.localPeerConnection = new RTCPeerConnection(this.servers);
    this.trace('Created local peer connection object localPeerConnection.');
    this.localPeerConnection.addEventListener('icecanidate', event => this.handleConnection(event));
    this.localPeerConnection.addEventListener('iceconnectionstatechange', event => this.handleConnectionChange(event));
    this.remotePeerConnection = new RTCPeerConnection(this.servers);
    this.trace('Created remote peer connection object remotePeerConnection.');

    this.remotePeerConnection.addEventListener('icecandidate', event => this.handleConnection(event));
    this.remotePeerConnection.addEventListener(
      'iceconnectionstatechange', event => this.handleConnectionChange(event));
    this.remotePeerConnection.addEventListener('addstream', event => this.gotRemoteMediaStream(event));

    // Add local stream to connection and create offer to connect.
    this.localPeerConnection.addStream(this.localStream);
    this.trace('Added local stream to localPeerConnection.');

    this.trace('localPeerConnection createOffer start.');
    this.localPeerConnection.createOffer(this.offerOptions)
      .then(description => this.createdOffer(description)).catch(error => this.setSessionDescriptionError(error));
  }

  createdOffer(description) {
    this.trace(`Offer from localPeerConnection:\n${description.sdp}`);

    this.trace('localPeerConnection setLocalDescription start.');
    this.localPeerConnection.setLocalDescription(description)
      .then(() => {
        this.setLocalDescriptionSuccess(this.localPeerConnection);
      }).catch(error => this.setSessionDescriptionError(error));

    this.trace('remotePeerConnection setRemoteDescription start.');
    this.remotePeerConnection.setRemoteDescription(description)
      .then(() => {
        this.setRemoteDescriptionSuccess(this.remotePeerConnection);
      }).catch(error => this.setSessionDescriptionError(error));

    this.trace('remotePeerConnection createAnswer start.');
    this.remotePeerConnection.createAnswer()
      .then(desc => this.createdAnswer(desc))
      .catch(error => this.setSessionDescriptionError(error));
  }

  setLocalDescriptionSuccess(peerConnection) {
    this.setDescriptionSuccess(peerConnection, 'setLocalDescription');
  }

  setDescriptionSuccess(peerConnection, functionName) {
    const peerName = this.getPeerName(peerConnection);
    this.trace(`${peerName} ${functionName} complete.`);
  }

  setSessionDescriptionError(error) {
    this.trace(`Failed to create session description: ${error.toString()}.`);
  }

  setRemoteDescriptionSuccess(peerConnection) {
    this.setDescriptionSuccess(peerConnection, 'setRemoteDescription');
  }

  createdAnswer(description) {
    this.trace(`Answer from remotePeerConnection:\n${description.sdp}.`);

    this.trace('remotePeerConnection setLocalDescription start.');
    this.remotePeerConnection.setLocalDescription(description)
      .then(() => {
        this.setLocalDescriptionSuccess(this.remotePeerConnection);
      }).catch(error => this.setSessionDescriptionError(error));

    this.trace('localPeerConnection setRemoteDescription start.');
    this.localPeerConnection.setRemoteDescription(description)
      .then(() => {
        this.setRemoteDescriptionSuccess(this.localPeerConnection);
      }).catch(error => this.setSessionDescriptionError(error));
  }

  btnRemoteStartClick() {
    const n = <any>navigator;
    n.mediaDevices.getUserMedia(this.mediaStreamConstraints).
    then(mediaStream => this.gotLocalMediaStream(mediaStream)).
    catch(err => this.handleLocalMediaStreamError(err));
  }

  btnRemoteVideoClick() {
    this.connectRemote();
  }

  gotLocalMediaStream(mediaStream) {
    this.localVideo = document.getElementById('remoteVideo');
    this.localStream = mediaStream;
    this.localVideo.srcObject = mediaStream;
  }

  gotRemoteMediaStream(event) {
    this.remoteVideo = document.getElementById('remoteVideo');
    const mediaStream = event.stream;
    this.remoteStream = mediaStream;
    this.remoteVideo.srcObject = mediaStream;
    console.log('CALLING PLAY');
    this.remoteVideo.play();
  }

  handleLocalMediaStreamError(err) {
    console.log('navigator.getUserMedia error: ', err);
  }
}
