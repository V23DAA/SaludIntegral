import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../interfaces/Activity.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivityGeneratorService {
  private apiUrl = 'http://localhost:8080/api';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  generateActivities(preferences?: {
    duration?: number,
    category?: 'meditation' | 'exercise' | 'breathing' | 'mindfulness',
    difficulty?: 'easy' | 'medium' | 'hard'
  }): Observable<Activity[]> {
    const body = {
      count: 4,
      preferences: preferences || {},
      prompt: `Generate personalized mental health activities focusing on mindfulness,
              meditation, breathing exercises, and mental wellness. Each activity should
              be practical, engaging, and suitable for daily practice.`
    };

    return this.http.post<Activity[]>(
      `${this.apiUrl}/activities/ai-generate`,
      body,
      { headers: this.headers }
    );
  }
}
