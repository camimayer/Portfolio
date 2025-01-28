import { 
  Component, 
  ViewChild, 
  ElementRef, 
  AfterViewChecked 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('scrollMe') private scrollContainer!: ElementRef;

  isOpen = false;
  userInput = '';
  messages: ChatMessage[] = [];

  constructor(private chatService: ChatService) {
    // Mensagem inicial
    this.messages.push({
      role: 'user',
      content: 'Hello, my name is Camila! Ask questions about my experience.'
    });
  }

  // Após a view ser atualizada, rola para a última mensagem
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = 
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Erro ao rolar a lista de mensagens', err);
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text) return;

    // Adiciona mensagem do usuário
    this.messages.push({ role: 'user', content: text });
    this.userInput = '';

    // Chama o serviço da AI
    this.chatService.sendMessage(text).subscribe(
      (response) => {
        const aiReply = response?.choices?.[0]?.message?.content?.trim();
        if (aiReply) {
          this.messages.push({ role: 'assistant', content: aiReply });
        }
      },
      (error) => {
        console.error('Erro ao enviar mensagem para IA:', error);
        this.messages.push({
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro ao processar sua mensagem.'
        });
      }
    );
  }
}
