import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Task {
    id: string;
    state: string;
    info: any;
}

@Injectable()
export class TaskService {
    private path: string = 'base/task/';

    constructor(private http: HttpClient) { }

    get(id: string) {
        return this.http.get<Task>(`${this.path}${id}/`);
    }

}
