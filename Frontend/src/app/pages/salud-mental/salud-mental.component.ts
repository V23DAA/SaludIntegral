import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MoodEntry } from './../../interfaces/MoodEntry.interface';
import { Activity } from '../../interfaces/Activity.interface';


interface SupportResource {
  id: number;
  title: string;
  description: string;
  icon: string;
  type: string;
}

@Component({
  selector: 'app-mental-health-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salud-mental.component.html',
  styleUrls: ['./salud-mental.component.css']
})
export default class SaludMentalComponent implements OnInit {
  username: string = '';
  showMoodModal: boolean = false;
  newMood: number = 3;
  newNotes: string = '';
  currentMood: number = 4;
  currentDate: Date = new Date();
  recentDays: {
isToday: any; date: Date; dayName: string
}[] = [];

  dailyActivities: Activity[] = [
    {
      id: 1,
      title: 'Meditación Matutina',
      description: 'Ejercicio de respiración consciente',
      duration: '10 min',
      category: 'meditation',
      completed: true
    },
    {
      id: 2,
      title: 'Caminata Mindfulness',
      description: 'Caminar prestando atención al presente',
      duration: '20 min',
      category: 'mindfulness',
      completed: false
    },
    {
      id: 3,
      title: 'Ejercicios de Relajación',
      description: 'Técnicas de relajación muscular progresiva',
      duration: '15 min',
      category: 'exercise',
      completed: false
    },
    {
      id: 4,
      title: 'Respiración 4-7-8',
      description: 'Técnica de respiración para reducir el estrés',
      duration: '5 min',
      category: 'breathing',
      completed: false
    }
  ];

  weeklyStats = {
    activitiesCompleted: 12,
    meditationMinutes: 85,
    averageMood: 4.2
  };

  moodHistory: MoodEntry[] = [
    { date: 'Lun', mood: 3, notes: '' },
    { date: 'Mar', mood: 4, notes: '' },
    { date: 'Mié', mood: 5, notes: '' },
    { date: 'Jue', mood: 3, notes: '' },
    { date: 'Vie', mood: 4, notes: '' },
    { date: 'Sáb', mood: 5, notes: '' },
    { date: 'Dom', mood: 4, notes: '' }
  ];

  supportResources: SupportResource[] = [
    {
      id: 1,
      title: 'Ejercicios de Respiración',
      description: 'Técnicas guiadas para manejar la ansiedad',
      icon: '🫁',
      type: 'breathing'
    },
    {
      id: 2,
      title: 'Meditaciones Guiadas',
      description: 'Sesiones de diferentes duraciones y enfoques',
      icon: '🧘‍♀️',
      type: 'meditation'
    },
    {
      id: 3,
      title: 'Diario Emocional',
      description: 'Registra y reflexiona sobre tus emociones',
      icon: '📝',
      type: 'journaling'
    },
    {
      id: 4,
      title: 'Red de Apoyo',
      description: 'Conecta con grupos de apoyo y comunidades',
      icon: '🤝',
      type: 'community'
    }
  ];

  constructor(private userService: UserService) {
    this.userService.getCurrentUser().subscribe(user => {
      this.username = user ? user.nombre : 'Usuario';
    });

    this.updateMood();
    this.updateWeeklyStats();
    this.generateRecentDays();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  getCurrentMoodEmoji(): string {
    const emojis = ['😢', '😟', '😐', '😊', '😄'];
    return emojis[this.currentMood - 1] || '😐';
  }

  getCurrentMoodText(): string {
    const moodTexts = [
      'Muy Triste',
      'Triste',
      'Neutral',
      'Feliz',
      'Muy Feliz'
    ];
    return moodTexts[this.currentMood - 1] || 'Neutral';
  }

  openMoodTracker(): void {
    console.log('Opening modal...');
    this.showMoodModal = true;
    this.newMood = this.currentMood;
    this.newNotes = '';
  }

  closeMoodModal(): void {
    this.showMoodModal = false;
  }

  saveMood(): void {
    if (this.newMood < 1 || this.newMood > 5) {
      console.error('Invalid mood value');
      return;
    }

    this.currentMood = this.newMood;

    const today = new Date();
    const dayName = today.toLocaleDateString('es', { weekday: 'short' });

    const todayEntry = this.moodHistory.find(entry => entry.date === dayName);
    if (todayEntry) {
      todayEntry.mood = this.newMood;
      todayEntry.notes = this.newNotes;
    } else {
      this.moodHistory.push({
        date: dayName,
        mood: this.newMood,
        notes: this.newNotes
      });
    }

    this.calculateAverageMood();
    this.closeMoodModal();
  }

  toggleActivity(activity: Activity): void {
    activity.completed = !activity.completed;
    this.updateWeeklyStats();
    this.saveActivityProgress();

    console.log(`Actividad ${activity.title} ${activity.completed ? 'completada' : 'marcada como pendiente'}`);
  }

  accessResource(resource: SupportResource): void {
    console.log('Accediendo al recurso:', resource.title);
    switch(resource.type) {
      case 'breathing':
        this.navigateToBreathingExercises();
        break;
      case 'meditation':
        this.navigateToMeditation();
        break;
      case 'journaling':
        this.navigateToJournal();
        break;
      case 'community':
        this.navigateToCommunity();
        break;
    }
  }

  contactEmergencyLine(): void {
    console.log('Contactando línea de emergencia');
    window.open('tel:106');
  }

  private loadUserData(): void {
    setTimeout(() => {
      this.currentMood = Math.floor(Math.random() * 5) + 1;
    }, 1000);
  }

  private updateMood(): void {
    const newMood = Math.floor(Math.random() * 5) + 1;
    this.currentMood = newMood;

    const today = new Date();
    const dayName = today.toLocaleDateString('es', { weekday: 'short' });

    const todayEntry = this.moodHistory.find(entry => entry.date === dayName);
    if (todayEntry) {
      todayEntry.mood = newMood;
    }

    this.calculateAverageMood();
  }

  private updateWeeklyStats(): void {
    const completedActivities = this.dailyActivities.filter(a => a.completed).length;
    this.weeklyStats.activitiesCompleted = completedActivities * 4;

    const meditationActivities = this.dailyActivities
      .filter(a => a.completed && (a.category === 'meditation' || a.category === 'breathing'))
      .reduce((total, activity) => {
        const minutes = parseInt(activity.duration.split(' ')[0]);
        return total + minutes;
      }, 0);

    this.weeklyStats.meditationMinutes = meditationActivities * 7;
  }

  private calculateAverageMood(): void {
    const totalMood = this.moodHistory.reduce((sum, entry) => sum + entry.mood, 0);
    this.weeklyStats.averageMood = Math.round((totalMood / this.moodHistory.length) * 10) / 10;
  }

  private saveActivityProgress(): void {
    console.log('Guardando progreso de actividades...');
  }

  private navigateToBreathingExercises(): void {
    console.log('Navegando a ejercicios de respiración');

  }

  private navigateToMeditation(): void {
    console.log('Navegando a meditaciones guiadas');
  }

  private navigateToJournal(): void {
    console.log('Navegando al diario emocional');
  }

  private navigateToCommunity(): void {
    console.log('Navegando a la red de apoyo');
  }

  generateRecentDays() {
    const days = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        date: date,
        dayName: date.toLocaleDateString('es', { weekday: 'short' }),
        isToday: i === 0
      });
    }
    this.recentDays = days;
  }
}
