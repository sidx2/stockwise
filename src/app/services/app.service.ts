import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

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

  vendorUpdated(_vendor: any) {
    console.log("_vendor in vendorUpdate: ", _vendor);
    this.socket.emit("vendorUpdated", { room: _vendor.vendor.orgId, vendor: _vendor.vendor });
  }

  startedEditing(orgId: string, vendorId: string) {
    this.socket.emit("startedEditing", {room: orgId, vendorId});
  }

  cancelledEditing(orgId: string, vendorId: string) {
    this.socket.emit("cancelledEditing", {room: orgId, vendorId});
  }
}
