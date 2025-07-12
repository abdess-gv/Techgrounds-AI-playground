export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          target_user_id: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          target_user_id?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          target_user_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      content_modules: {
        Row: {
          content: Json
          created_at: string
          created_by: string
          description: string | null
          id: string
          published_at: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content: Json
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          published_at?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          published_at?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      course_progress: {
        Row: {
          certificate_earned: boolean | null
          completed_lessons: number | null
          completion_percentage: number | null
          course_name: string
          created_at: string | null
          id: string
          last_accessed: string | null
          moodle_course_id: number
          total_lessons: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          certificate_earned?: boolean | null
          completed_lessons?: number | null
          completion_percentage?: number | null
          course_name: string
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          moodle_course_id: number
          total_lessons?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          certificate_earned?: boolean | null
          completed_lessons?: number | null
          completion_percentage?: number | null
          course_name?: string
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          moodle_course_id?: number
          total_lessons?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      folders: {
        Row: {
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          parent_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "folders_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      moodle_config: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      moodle_users: {
        Row: {
          created_at: string | null
          enrollment_date: string | null
          id: string
          moodle_user_id: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          enrollment_date?: string | null
          id?: string
          moodle_user_id: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          enrollment_date?: string | null
          id?: string
          moodle_user_id?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null
          created_at: string | null
          folder_id: string | null
          id: string
          is_favorite: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          folder_id?: string | null
          id?: string
          is_favorite?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          folder_id?: string | null
          id?: string
          is_favorite?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_access: {
        Row: {
          access_level: string
          course_type: string
          created_at: string | null
          expires_at: string | null
          id: string
          payment_amount: number | null
          payment_status: string | null
          purchase_date: string | null
          stripe_payment_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_level: string
          course_type: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          payment_amount?: number | null
          payment_status?: string | null
          purchase_date?: string | null
          stripe_payment_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_level?: string
          course_type?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          payment_amount?: number | null
          payment_status?: string | null
          purchase_date?: string | null
          stripe_payment_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          language_preference: string | null
          subscription_plan:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          updated_at: string | null
          user_role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          language_preference?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          updated_at?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          language_preference?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          updated_at?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      program_cycle_details: {
        Row: {
          created_at: string
          day_of_week: number
          general_info: string
          id: string
          link_url: string | null
          location_info: string
          program_id: string
          time_info: string
          updated_at: string
          week_in_cycle: number
        }
        Insert: {
          created_at?: string
          day_of_week: number
          general_info?: string
          id?: string
          link_url?: string | null
          location_info?: string
          program_id: string
          time_info?: string
          updated_at?: string
          week_in_cycle: number
        }
        Update: {
          created_at?: string
          day_of_week?: number
          general_info?: string
          id?: string
          link_url?: string | null
          location_info?: string
          program_id?: string
          time_info?: string
          updated_at?: string
          week_in_cycle?: number
        }
        Relationships: [
          {
            foreignKeyName: "program_cycle_details_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_date_overrides: {
        Row: {
          created_at: string
          general_info: string
          id: string
          link_url: string | null
          location_info: string
          override_date: string
          program_id: string
          time_info: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          general_info?: string
          id?: string
          link_url?: string | null
          location_info?: string
          override_date: string
          program_id: string
          time_info?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          general_info?: string
          id?: string
          link_url?: string | null
          location_info?: string
          override_date?: string
          program_id?: string
          time_info?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_date_overrides_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          anchor_date: string | null
          created_at: string
          cycle_weeks: number | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          updated_at: string
        }
        Insert: {
          anchor_date?: string | null
          created_at?: string
          cycle_weeks?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          anchor_date?: string | null
          created_at?: string
          cycle_weeks?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      roster_entries: {
        Row: {
          created_at: string
          day_of_week: number
          description: string | null
          end_time: string
          id: string
          location_details: string | null
          location_type: string
          meeting_url: string | null
          program_id: string
          start_time: string
          title: string
          updated_at: string
          week_number: number
        }
        Insert: {
          created_at?: string
          day_of_week: number
          description?: string | null
          end_time: string
          id?: string
          location_details?: string | null
          location_type: string
          meeting_url?: string | null
          program_id: string
          start_time: string
          title: string
          updated_at?: string
          week_number: number
        }
        Update: {
          created_at?: string
          day_of_week?: number
          description?: string | null
          end_time?: string
          id?: string
          location_details?: string | null
          location_type?: string
          meeting_url?: string | null
          program_id?: string
          start_time?: string
          title?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "roster_entries_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
          updated_by: string
        }
        Insert: {
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
          updated_by: string
        }
        Update: {
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      transcriptions: {
        Row: {
          auto_formatted: boolean | null
          confidence_score: number | null
          created_at: string | null
          file_url: string | null
          id: string
          language: string | null
          note_id: string | null
          original_filename: string | null
          processing_time_ms: number | null
          provider: Database["public"]["Enums"]["transcription_provider"]
          status: string | null
          tone_analysis: Json | null
          transcription_text: string | null
          user_id: string
        }
        Insert: {
          auto_formatted?: boolean | null
          confidence_score?: number | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          language?: string | null
          note_id?: string | null
          original_filename?: string | null
          processing_time_ms?: number | null
          provider: Database["public"]["Enums"]["transcription_provider"]
          status?: string | null
          tone_analysis?: Json | null
          transcription_text?: string | null
          user_id: string
        }
        Update: {
          auto_formatted?: boolean | null
          confidence_score?: number | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          language?: string | null
          note_id?: string | null
          original_filename?: string | null
          processing_time_ms?: number | null
          provider?: Database["public"]["Enums"]["transcription_provider"]
          status?: string | null
          tone_analysis?: Json | null
          transcription_text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transcriptions_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transcriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_stats: {
        Row: {
          action_type: string
          created_at: string | null
          details: Json | null
          id: string
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          details?: Json | null
          id?: string
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      ai_provider: "openai" | "grok" | "gemini"
      subscription_plan: "free" | "pro" | "enterprise"
      transcription_provider: "openai" | "deepgram" | "assemblyai"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_provider: ["openai", "grok", "gemini"],
      subscription_plan: ["free", "pro", "enterprise"],
      transcription_provider: ["openai", "deepgram", "assemblyai"],
      user_role: ["user", "admin"],
    },
  },
} as const
