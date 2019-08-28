import { Injectable } from '@angular/core';

@Injectable()
export class Api<%= classify(name) %>Client {
    private readonly proxy: string = '<%= dasherize(name) %>';

    constructor(private readonly data: HttpClient) {}
}
