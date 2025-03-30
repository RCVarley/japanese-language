export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      grammar_points: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      join_grammar_sentence: {
        Row: {
          grammar_point_id: string;
          sentence_id: string | null;
          user_id: string;
        };
        Insert: {
          grammar_point_id: string;
          sentence_id?: string | null;
          user_id: string;
        };
        Update: {
          grammar_point_id?: string;
          sentence_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "join_grammar_sentence_grammar_point_id_fkey";
            columns: ["grammar_point_id"];
            isOneToOne: true;
            referencedRelation: "grammar_points";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "join_grammar_sentence_sentence_id_fkey";
            columns: ["sentence_id"];
            isOneToOne: false;
            referencedRelation: "sentences";
            referencedColumns: ["id"];
          },
        ];
      };
      join_kanji_vocabulary: {
        Row: {
          kanji_id: string;
          user_id: string;
          vocabulary_id: string;
        };
        Insert: {
          kanji_id: string;
          user_id?: string;
          vocabulary_id: string;
        };
        Update: {
          kanji_id?: string;
          user_id?: string;
          vocabulary_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "join_kanji_vocabulary_kanji_id_fkey";
            columns: ["kanji_id"];
            isOneToOne: false;
            referencedRelation: "kanji";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "join_kanji_vocabulary_vocabulary_id_fkey";
            columns: ["vocabulary_id"];
            isOneToOne: false;
            referencedRelation: "vocabulary";
            referencedColumns: ["id"];
          },
        ];
      };
      join_sentence_text: {
        Row: {
          sentence_id: string;
          text_id: string;
          user_id: string;
        };
        Insert: {
          sentence_id: string;
          text_id: string;
          user_id?: string;
        };
        Update: {
          sentence_id?: string;
          text_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "join_sentence_text_sentence_id_fkey";
            columns: ["sentence_id"];
            isOneToOne: false;
            referencedRelation: "sentences";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "join_sentence_text_text_id_fkey";
            columns: ["text_id"];
            isOneToOne: false;
            referencedRelation: "texts";
            referencedColumns: ["id"];
          },
        ];
      };
      join_vocabulary_sentence: {
        Row: {
          sentence_id: string;
          user_id: string;
          vocabulary_id: string;
        };
        Insert: {
          sentence_id: string;
          user_id?: string;
          vocabulary_id: string;
        };
        Update: {
          sentence_id?: string;
          user_id?: string;
          vocabulary_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "join_vocabulary_sentence_sentence_id_fkey";
            columns: ["sentence_id"];
            isOneToOne: false;
            referencedRelation: "sentences";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "join_vocabulary_sentence_vocabulary_id_fkey";
            columns: ["vocabulary_id"];
            isOneToOne: false;
            referencedRelation: "vocabulary";
            referencedColumns: ["id"];
          },
        ];
      };
      kanji: {
        Row: {
          character: string;
          created_at: string;
          id: string;
          kun: string[];
          on: string[];
          user_id: string;
        };
        Insert: {
          character?: string;
          created_at?: string;
          id?: string;
          kun?: string[];
          on?: string[];
          user_id?: string;
        };
        Update: {
          character?: string;
          created_at?: string;
          id?: string;
          kun?: string[];
          on?: string[];
          user_id?: string;
        };
        Relationships: [];
      };
      sentences: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      texts: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          id?: string;
          title?: string;
          user_id?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      vocabulary: {
        Row: {
          created_at: string;
          id: string;
          meaning: string | null;
          reading: string | null;
          user_id: string;
          word: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          meaning?: string | null;
          reading?: string | null;
          user_id?: string;
          word?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          meaning?: string | null;
          reading?: string | null;
          user_id?: string;
          word?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (
      & Database[PublicTableNameOrOptions["schema"]]["Tables"]
      & Database[PublicTableNameOrOptions["schema"]]["Views"]
    )
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database } ? (
    & Database[PublicTableNameOrOptions["schema"]]["Tables"]
    & Database[PublicTableNameOrOptions["schema"]]["Views"]
  )[TableName] extends {
    Row: infer R;
  } ? R
  : never
  : PublicTableNameOrOptions extends keyof (
    & PublicSchema["Tables"]
    & PublicSchema["Views"]
  ) ? (
      & PublicSchema["Tables"]
      & PublicSchema["Views"]
    )[PublicTableNameOrOptions] extends {
      Row: infer R;
    } ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  } ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    } ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  } ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    } ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  } ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]][
      "CompositeTypes"
    ]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][
    CompositeTypeName
  ]
  : PublicCompositeTypeNameOrOptions extends
    keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
