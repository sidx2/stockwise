import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Editor, IVendorUpdate, Vendor } from '../main-module/vendors-module/models/vendor';

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

  joinRoom(room: string, userId: string) {
    this.socket.emit("joinRoom", {room, userId});
  }

  vendorUpdated(orgId: string, vendorUpdate: Partial<Vendor>) {
    console.log("_vendor in vendorUpdate: ", vendorUpdate);
    this.socket.emit("vendorUpdated", { room: orgId, vendor: vendorUpdate });
  }

  startedEditing(orgId: string, editor: Editor) {
    this.socket.emit("startedEditing", {room: orgId, editor });
  }

  cancelledEditing(orgId: string, vendor: Vendor) {
    this.socket.emit("cancelledEditing", {room: orgId, vendor});
  }
}
