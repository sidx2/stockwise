import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Editor, IVendorUpdate } from '../main-module/vendors-module/models/vendor';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private socket: Socket
  ) {
  }
  sendMessage(p1: any) {
    this.socket.emit("editing", { p1 })
  }

  joinRoom(room: string) {
    this.socket.emit("joinRoom", room);
  }

  vendorUpdated(vendorUpdate: IVendorUpdate) {
    console.log("_vendor in vendorUpdate: ", vendorUpdate);
    this.socket.emit("vendorUpdated", { room: vendorUpdate.vendor.orgId, vendor: vendorUpdate.vendor });
  }

  startedEditing(orgId: string, editor: Editor) {
    this.socket.emit("startedEditing", {room: orgId, editor });
  }

  cancelledEditing(orgId: string, vendorId: string) {
    this.socket.emit("cancelledEditing", {room: orgId, vendorId});
  }
}
